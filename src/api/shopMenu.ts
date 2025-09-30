import accessClient from 'api';
import type {
  MenusResponse, MenuResponse, MutationMenuArgs, Menu,
} from 'model/menus.model';

export const getMenusList = async (id: number): Promise<MenusResponse> => {
  const res = await accessClient.get<MenusResponse>(`/admin/shops/${id}/menus`);
  return res.data;
};

export const getMenu = async (
  payload: { id: number; menuId: number },
): Promise<MenuResponse> => {
  const { id: shopId, menuId } = payload;
  const res = await accessClient.get<MenuResponse>(`/admin/shops/${shopId}/menus/${menuId}`);
  return res.data;
};

export const updateMenu = async (payload: MutationMenuArgs): Promise<MenusResponse> => {
  const { id: shopId, menuId, menuData } = payload;
  const res = await accessClient.put<MenusResponse>(
    `/admin/shops/${shopId}/menus/${menuId}`,
    menuData,
  );
  return res.data;
};

export const deleteMenu = async (
  payload: { id: number; menuId: number },
): Promise<MenusResponse> => {
  const { id: shopId, menuId } = payload;
  const res = await accessClient.delete<MenusResponse>(`/admin/shops/${shopId}/menus/${menuId}`);
  return res.data;
};

export const addMenu = async (
  payload: { id: number; formData: Menu },
): Promise<Menu> => {
  const { id: shopId, formData } = payload;
  const res = await accessClient.post<Menu>(`/admin/shops/${shopId}/menus`, formData);
  return res.data;
};
