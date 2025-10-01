import { queryOptions, skipToken } from '@tanstack/react-query';
import {
  getMenusList,
  getMenu,
} from 'api/shopMenu';
import type { MenusResponse, MenuResponse } from 'model/shopMenus.model';

const shopMenuQueries = {
  allKeys: () => ['shopMenus'],

  listKeys: (shopId: number) => [...shopMenuQueries.allKeys(), 'list', shopId],
  list: (shopId?: number) => queryOptions<MenusResponse>({
    queryKey: shopId != null ? shopMenuQueries.listKeys(shopId) : ['shopMenus', 'list', 'NO_ID'],
    queryFn: shopId != null ? () => getMenusList(shopId) : skipToken,
  }),

  detailKeys: (shopId: number, menuId: number) => [
    ...shopMenuQueries.allKeys(), 'detail', shopId, menuId],
  detail: (payload?: { id?: number; menuId?: number }) => queryOptions<MenuResponse>({
    queryKey: payload?.id != null && payload?.menuId != null
      ? shopMenuQueries.detailKeys(payload.id, payload.menuId)
      : ['shopMenus', 'detail', 'NO_ID'],
    queryFn: payload?.id != null && payload?.menuId != null
      ? () => getMenu({ id: payload.id!, menuId: payload.menuId! })
      : skipToken,
  }),
};

export default shopMenuQueries;
