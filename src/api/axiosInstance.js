import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (refreshToken) {
          const response = await axios.post(
            "https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Authentication/Re-create-token",
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;

          localStorage.setItem("token", accessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return axiosInstance(originalRequest);
        } else {
          return Promise.reject(new Error("No refresh token available"));
        }
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
