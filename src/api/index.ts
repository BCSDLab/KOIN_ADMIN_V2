/* eslint-disable no-underscore-dangle */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import store from 'store';
import { login, logout } from 'store/slice/auth';
import { ApiErrorResponse } from 'interfaces/APIError';

interface RetryableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

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
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig | undefined;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
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

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
        }

        return await accessClient(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    if (error.response?.data) {
      const apiError = error.response.data;

      if (apiError.message) {
        error.message = apiError.message;
      }

      (error as AxiosError<ApiErrorResponse> & { apiError?: ApiErrorResponse }).apiError = apiError;
    }

    return Promise.reject(error);
  },
);

export default accessClient;
