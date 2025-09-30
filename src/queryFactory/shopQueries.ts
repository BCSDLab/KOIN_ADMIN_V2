import { queryOptions, skipToken } from '@tanstack/react-query';
import type { StoreParams } from 'model/store.model';
import {
  getShopList,
  getShop,
} from 'api/shop';

const shopQueries = {
  allKeys: () => ['shop'],

  listKeys: (params:StoreParams) => [...shopQueries.allKeys(), 'list', { params }],
  list: (params: StoreParams) => queryOptions({
    queryKey: shopQueries.listKeys(params),
    queryFn: () => getShopList(params),
  }),

  detailKeys: (id:number) => [...shopQueries.allKeys(), 'detail', id],
  detail: (id?: number) => queryOptions({
    queryKey: id != null ? shopQueries.detailKeys(id) : ['shop', 'detail', 'NO_ID'],
    queryFn: id != null ? () => getShop(id) : skipToken,
  }),
};

export default shopQueries;
