import accessClient from 'api';
import type {
  Admin,
  AdminListRequest,
  AdminListResponse,
  ChangeAdminAuthedRequest,
  SignUpAdminRequest,
} from 'model/admin.model';

export const getAdminInfo = async (id: number) => {
  const response = await accessClient.get<Admin>(`admin/${id}`);
  return response.data;
};

export const getAdminList = async (data: AdminListRequest) => {
  const response = await accessClient.get<AdminListResponse>('admins', {
    params: {
      page: data.page,
      limit: data.limit,
      isAuthed: data.isAuthed,
      trackName: data.trackName,
    },
  });
  return response.data;
};

export const changeAdminInfo = async (id: number, data: Partial<Admin>) => {
  const response = await accessClient.put<void>(`admin/${id}`, data);
  return response.data;
};

export const changeAdminPermission = async (id: number, data: Partial<Admin>) => {
  const response = await accessClient.put<void>(`admin/${id}/permission`, data);
  return response.data;
};

export const changeAdminAuthed = async (id: number, data: ChangeAdminAuthedRequest) => {
  const response = await accessClient.put<void>(`admin/${id}/authed`, data);
  return response.data;
};

export const createAdmin = async (data: SignUpAdminRequest) => {
  const response = await accessClient.post<void>('admin', data);
  return response.data;
};
