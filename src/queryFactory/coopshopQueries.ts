import { queryOptions } from '@tanstack/react-query';
import { getCoopShopSemesterList } from 'api/coopShopUpdate';

const coopShopQueries = {
  allkeys: () => ['coopShop'],

  coopShopSemesterListKeys: () => [...coopShopQueries.allkeys(), 'semesterList'],
  coopShopSemesterList: () => queryOptions({
    queryKey: coopShopQueries.coopShopSemesterListKeys(),
    queryFn: () => getCoopShopSemesterList(),
  }),
};

export default coopShopQueries;
