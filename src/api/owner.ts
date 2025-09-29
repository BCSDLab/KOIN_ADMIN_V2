import accessClient from 'api';
import {
  OwnerResponse, OwnersResponse, DeleteOwnerResponse,
} from 'model/owner.model';

export const getOwner = async (id: number) => {
  const response = await accessClient.get<OwnerResponse>(`admin/users/owner/${id}`);
  return response.data;
};

export const getOwnerList = async (page : number) => {
  const response = await accessClient.get<OwnersResponse>(`admin/users/owners?page=${page}`);
  return response.data;
};

export const updateOwner = async (data: Pick<OwnerResponse, 'id'> & Partial<OwnerResponse>) => {
  const { id, ...body } = data;
  const response = await accessClient.put<void>(`admin/users/owner/${id}`, body);
  return response;
};

export const deleteOwner = async (id: number) => {
  const response = await accessClient.delete<DeleteOwnerResponse>(`admin/users/${id}`);
  return response;
};
