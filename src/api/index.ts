/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import store from 'store';
import { login, logout } from 'store/slice/auth';

const accessClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}`,
  timeout: 100000,
  withCredentials: true,
});

accessClient.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.token;

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

accessClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // 새로운 access token 발급
        const { data } = await axios.post(`${import.meta.env.VITE_API_PATH}/user/refresh`, {
          refresh_token: refreshToken,
        });

        store.dispatch(login({
          token: data.token,
          refresh_token: data.refresh_token,
        }));

        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return await accessClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default accessClient;
