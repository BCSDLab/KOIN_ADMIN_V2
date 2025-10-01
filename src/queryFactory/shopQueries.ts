import { queryOptions, skipToken } from '@tanstack/react-query';
import type {
  ShopDetailForm, ShopParams, ShopResponse,
  ShopsResponse, ShopTransformResponse,
} from 'model/shop.model';
import {
  getShopList,
  getShop,
} from 'api/shop';

const shopQueries = {
  allKeys: () => ['shop'],

  listKeys: (params:ShopParams) => [...shopQueries.allKeys(), 'list', { params }],
  list: (params: ShopParams) => queryOptions({
    queryKey: shopQueries.listKeys(params),
    queryFn: () => getShopList(params),
    select: (data:ShopsResponse):ShopTransformResponse => {
      return {
        ...data,
        shops: data.shops.map((shop) => ({
          ...shop,
          category_names: shop.category_names.join(', '),
        })),
      };
    },
  }),

  detailKeys: (id:number) => [...shopQueries.allKeys(), 'detail', id],
  detail: (id?: number) => queryOptions({
    queryKey: id != null ? shopQueries.detailKeys(id) : ['shop', 'detail', 'NO_ID'],
    queryFn: id != null ? () => getShop(id) : skipToken,
    select: (data:ShopResponse):ShopDetailForm => {
      return {
        ...data,
        category_ids: data.shop_categories.map((category) => category.id),
      };
    },
  }),
};

export default shopQueries;
