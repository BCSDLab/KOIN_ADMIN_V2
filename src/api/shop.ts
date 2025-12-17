import type {
  ShopDetailForm,
  ShopParams, ShopResponse, ShopsResponse,
} from 'model/shop.model';
import accessClient from './index';

export const getShopList = async (params:ShopParams):Promise<ShopsResponse> => {
  const res = await accessClient.get<ShopsResponse>('admin/shops', { params });
  return res.data;
};

export const getShop = async (id:number):Promise<ShopResponse> => {
  const res = await accessClient.get<ShopResponse>(`admin/shops/${id}`);
  return res.data;
};

export const addShop = async (body:Partial<ShopResponse>):Promise<ShopResponse> => {
  const res = await accessClient.post<ShopResponse>('admin/shops', body);
  return res.data;
};

export const updateShop = async (payload:Pick<ShopResponse, 'id'> & Partial<ShopDetailForm>):Promise<void> => {
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
