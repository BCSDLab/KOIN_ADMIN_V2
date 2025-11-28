import { queryOptions } from '@tanstack/react-query';
import { getCoopshopSemesterList } from 'api/coopshopUpdate';

const coopshopQueries = {
  allkeys: () => ['coopshop'],

  coopshopSemesterListKeys: () => [...coopshopQueries.allkeys(), 'semesterList'],
  coopshopSemesterList: () => queryOptions({
    queryKey: coopshopQueries.coopshopSemesterListKeys(),
    queryFn: () => getCoopshopSemesterList(),
  }),
};

export default coopshopQueries;
