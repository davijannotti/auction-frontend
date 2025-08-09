import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  const originalFetch = globalThis.fetch;
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  globalThis.fetch = async (input, init = {}) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken) {
      init.headers = {
        ...init.headers,
        'Authorization': `Bearer ${accessToken}`,
      };
    }

    let response = await originalFetch(input, init);

    if (response.status === 401 && refreshToken && !input.url.includes('/api/token/') && !input.url.includes('/api/token/refresh/')) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          init.headers = {
            ...init.headers,
            'Authorization': `Bearer ${token}`,
          };
          return originalFetch(input, init);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await originalFetch('http://127.0.0.1:8000/api/token/refresh/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          processQueue(null, data.access);

          init.headers = {
            ...init.headers,
            'Authorization': `Bearer ${data.access}`,
          };
          response = await originalFetch(input, init); // Retry the original request
        } else {
          // Refresh token failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          processQueue('Refresh token failed');
          nuxtApp.runWithContext(() => useRouter().push('/login'));
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        processQueue(error);
        nuxtApp.runWithContext(() => useRouter().push('/login'));
      } finally {
        isRefreshing = false;
      }
    }

    return response;
  };
});