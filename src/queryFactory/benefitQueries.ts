import { queryOptions } from '@tanstack/react-query';
import { getBenefitCategory, getBenefitShops, searchShops } from 'api/benefit';

const benefitQueries = {
  allKey: () => ['benefit'] as const,

  categoryKey: () => [...benefitQueries.allKey(), 'category'] as const,
  getBenefitCategory: () => queryOptions({
    queryKey: benefitQueries.categoryKey(),
    queryFn: getBenefitCategory,
  }),

  shopsKey: (id?: number) => [...benefitQueries.allKey(), 'shops', id] as const,
  getBenefitShops: (id?: number) => queryOptions({
    queryKey: benefitQueries.shopsKey(id),
    queryFn: () => getBenefitShops(id),
    enabled: !!id,
  }),

  searchKey: (id?: number, keyword?: string) => [...benefitQueries.allKey(), 'search', id, keyword] as const,
  searchShops: (id?: number, keyword?: string) => queryOptions({
    queryKey: benefitQueries.searchKey(id, keyword),
    queryFn: () => searchShops({ id, keyword: keyword ?? '' }),
    enabled: !!id && !!keyword,
  }),
};

export default benefitQueries;
