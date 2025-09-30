import accessClient from 'api';
import type { MenuCategories } from 'model/menuCategory';
import type { MenuCategory } from 'model/menus.model';

export const getShopMenuCategories = async (id:number):Promise<MenuCategories> => {
  const res = await accessClient.get<MenuCategories>(`/admin/shops/${id}/menus/categories`);
  return res.data;
};

export const addShopMenuCategories = async (payload :{ id: number; name: string })
:Promise<MenuCategory> => {
  const { id, name } = payload;
  const res = await accessClient.post<MenuCategory>(`/admin/shops/${id}/menus/categories`, { name });
  return res.data;
};
