import { client } from "./client.gen";
import { apiTokenRefreshCreate } from "./sdk.gen";

export async function refreshAccessToken() {
  const { data, error } = await apiTokenRefreshCreate({
    credentials: "include",
  });

  if (error) {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
    return;
  }

  localStorage.setItem("access_token", data.access);

  client.setConfig({
    baseUrl: "http://localhost:8000",
    headers: {
      Authorization: `Bearer ${data.access}`,
    },
  });
}