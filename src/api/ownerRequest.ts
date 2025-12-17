import accessClient from 'api';
import type { OwnersResponse, OwnerResponse, OwnerRequestMutateResponseType } from 'model/owner.model';

export const getOwnerRequest = async (id: number) => {
  const response = await accessClient.get<OwnerResponse>(`admin/users/owner/${id}`);
  return response.data;
};

export const getOwnerRequestList = async (page: number) => {
  const response = await accessClient.get<OwnersResponse>(`admin/users/new-owners?page=${page}`);
  return response.data;
};

export const updateOwnerRequest = async (id: number) => {
  const response = await accessClient.put<OwnerRequestMutateResponseType>(`admin/owner/${id}/authed`);
  return response;
};

export const deleteOwnerRequest = async (id: number) => {
  const response = await accessClient.delete<OwnerRequestMutateResponseType>(`admin/users/${id}`);
  return response;
};
