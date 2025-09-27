import { queryOptions } from '@tanstack/react-query';
import {
  getCategoryList,
  getCategory,
  getParentCategory,
} from 'api/category';

const categoryQueries = {
  allKey: () => ['category'],

  listKey: () => [...categoryQueries.allKey(), 'list'],
  list: () => queryOptions({
    queryKey: [...categoryQueries.listKey()],
    queryFn: () => getCategoryList(),
  }),

  detailKey: (id: number) => [...categoryQueries.allKey(), 'detail', id],
  detail: (id: number) => queryOptions({
    queryKey: categoryQueries.detailKey(id),
    queryFn: () => getCategory(id),
    enabled: !!id,
  }),

  parentKey: () => [...categoryQueries.allKey(), 'parent'],
  parent: () => queryOptions({
    queryKey: categoryQueries.parentKey(),
    queryFn: () => getParentCategory(),
  }),
};

export default categoryQueries;
