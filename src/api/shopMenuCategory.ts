import accessClient from 'api';
import type { ShopMenuCategories } from 'model/shopMenuCategory';
import type { ShopMenuCategory } from 'model/shopMenus.model';

export const getShopMenuCategories = async (id:number):Promise<ShopMenuCategories> => {
  const res = await accessClient.get<ShopMenuCategories>(`/admin/shops/${id}/menus/categories`);
  return res.data;
};

export const addShopMenuCategories = async (payload :{ id: number; name: string })
:Promise<ShopMenuCategory> => {
  const { id, name } = payload;
  const res = await accessClient.post<ShopMenuCategory>(`/admin/shops/${id}/menus/categories`, { name });
  return res.data;
};
