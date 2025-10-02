import { queryOptions } from '@tanstack/react-query';
import { getBannerCategoryList } from 'api/bannerCategory';

const bannerCategoryQueries = {
  allKeys: ['bannerCategories'] as const,

  listKey: () => [...bannerCategoryQueries.allKeys] as const,
  list: () => queryOptions({
    queryKey: bannerCategoryQueries.listKey(),
    queryFn: getBannerCategoryList,
  }),
};

export default bannerCategoryQueries;
