import { queryOptions } from '@tanstack/react-query';
import {
  getCategoryList,
  getCategory,
  getParentCategory,
} from 'api/category';

const categoryQueries = {
  allKey: () => ['category'] as const,

  list: () => queryOptions({
    queryKey: [...categoryQueries.allKey(), 'list'],
    queryFn: () => getCategoryList(),
  }),

  detail: (id: number) => queryOptions({
    queryKey: [...categoryQueries.allKey(), 'detail', id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  }),

  parent: () => queryOptions({
    queryKey: [...categoryQueries.allKey(), 'parent'],
    queryFn: () => getParentCategory(),
  }),
};

export default categoryQueries;
