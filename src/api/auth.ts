import accessClient from 'api';
import axios from 'axios';
import type {
  AdminInfo, ChangePasswordRequest, LoginRequest, LoginResponse,
} from 'model/auth.model';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_PATH}`,
  timeout: 100000,
});

export const postLogin = async ({ email, password }: LoginRequest) => {
  const { data } = await apiClient.post<LoginResponse>('admin/user/login', {
    email: `${email}@koreatech.ac.kr`,
    password,
  });

  return data;
};

export const getAdminInfo = async () => {
  const { data } = await accessClient.get<AdminInfo>('admin');

  return data;
};

export const changePassword = async ({ old_password, new_password }: ChangePasswordRequest) => {
  await accessClient.put('admin/password', { old_password, new_password });
};
