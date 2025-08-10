import { defineNuxtPlugin, useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  const originalFetch = globalThis.fetch;
  let isRefreshing = false;
  let failedQueue = [];

  // --- Define your public API paths here ---
  // Any path that includes one of these strings will be treated as public.
  const publicApiPaths = [
    "/api/auctions", // For listing and retrieving auctions
    "/api/token/", // The login endpoint is public
  ];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  globalThis.fetch = async (input, init = {}) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!init.headers) {
      init.headers = {};
    }

    if (accessToken) {
      init.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    let response = await originalFetch(input, init);

    const requestUrl = typeof input === "string" ? input : input.url;
    const refreshToken = localStorage.getItem("refreshToken");

    // Check for 401 error, ensure we have a refresh token, and that it's not a refresh attempt itself
    if (
      response.status === 401 &&
      refreshToken &&
      !requestUrl.includes("/api/token/refresh/")
    ) {
      // --- SOLUTION: Check if the failed request was for a public route ---
      const isPublicPath = publicApiPaths.some((path) =>
        requestUrl.includes(path),
      );

      if (isPublicPath) {
        console.log(
          "Public route failed with an expired token. Retrying anonymously.",
        );
        // If it's a public path, the token was just expired.
        // We don't need to refresh. Just retry the request without the bad token.
        const newInit = { ...init };
        delete newInit.headers["Authorization"]; // Remove the invalid header
        return await originalFetch(input, newInit); // Retry the request
      }

      // --- This is the existing logic for PROTECTED routes ---
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            init.headers["Authorization"] = `Bearer ${token}`;
            return originalFetch(input, init);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await originalFetch(
          "http://127.0.0.1:8000/api/token/refresh/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          },
        );

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem("accessToken", data.access);
          // Some refresh strategies return a new refresh token, handle that if applicable
          if (data.refresh) {
            localStorage.setItem("refreshToken", data.refresh);
          }
          processQueue(null, data.access);

          init.headers["Authorization"] = `Bearer ${data.access}`;
          response = await originalFetch(input, init); // Retry the original request
        } else {
          // Refresh token itself is invalid. Log the user out.
          console.error("Refresh token failed. Logging out.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          processQueue("Refresh token failed");
          // Use Nuxt's router to navigate. Ensure this runs in the correct context.
          useRouter().push("/login");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        processQueue(error);
        useRouter().push("/login");
      } finally {
        isRefreshing = false;
      }
    }

    return response;
  };
});
