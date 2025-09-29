import accessClient from 'api';
import { UserDetail, UsersResponse } from 'model/user.model';

export const getUser = async (id: number) => {
  const response = await accessClient.get<UserDetail>(`admin/users/student/${id}`);
  return response.data;
};

export const getUserList = async (page: number) => {
  const response = await accessClient.get<UsersResponse>(`admin/students?page=${page}`);
  return response.data;
};

export const getNicknameCheck = async (nickname: string) => {
  const response = await accessClient.get<{ success: string }>(`user/check/nickname?nickname=${nickname}`);
  return response.data;
};

export const updateUser = async (data: Pick<UserDetail, 'id'> & Partial<UserDetail>) => {
  const { id, ...body } = data;
  const response = await accessClient.put<void>(`admin/users/student/${id}`, body);
  return response;
};
