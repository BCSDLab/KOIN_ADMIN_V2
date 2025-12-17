import { queryOptions, skipToken } from '@tanstack/react-query';
import { getShopMenuCategories } from 'api/shopMenuCategory';

const shopMenuCategoryQueries = {
  allKeys: () => ['shopMenuCategories'],

  listKeys: (shopId:number) => [...shopMenuCategoryQueries.allKeys(), 'list', shopId],
  list: (shopId?:number) => queryOptions({
    queryKey: shopId != null ? shopMenuCategoryQueries.listKeys(shopId) : ['shopMenuCategories', 'list', 'NO_ID'],
    queryFn: shopId != null ? () => getShopMenuCategories(shopId) : skipToken,
  }),

};

export default shopMenuCategoryQueries;
