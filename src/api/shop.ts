import type {
  StoreDetailForm,
  StoreParams, StoreResponse, StoresResponse,
} from 'model/store.model';
import accessClient from './index';

export const getShopList = async (params:StoreParams):Promise<StoresResponse> => {
  const res = await accessClient.get<StoresResponse>('admin/shops', { params });
  return res.data;
};

export const getShop = async (id:number):Promise<StoreResponse> => {
  const res = await accessClient.get<StoreResponse>(`admin/shops/${id}`);
  return res.data;
};

export const addShop = async (body:Partial<StoreResponse>):Promise<StoreResponse> => {
  const res = await accessClient.post<StoreResponse>('admin/shops', body);
  return res.data;
};

export const updateShop = async (payload:Pick<StoreResponse, 'id'> & Partial<StoreDetailForm>):Promise<void> => {
  const { id, ...body } = payload;
  await accessClient.put<void>(`admin/shops/${id}`, body);
};

export const deleteShop = async (id:number):Promise<{ success: boolean; id: number }> => {
  const res = await accessClient.delete<{ success: boolean; id: number }>(
    `admin/shops/${id}`,
  );
  return res.data;
};

export const undeleteShop = async (id:number):Promise<void> => {
  await accessClient.post<void>(`admin/shops/${id}/undelete`);
};
