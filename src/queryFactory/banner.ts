import { queryOptions } from '@tanstack/react-query';
import { getBanner, getBannerList } from 'api/banner';
import type { BannerParams, BannerTableHead } from 'model/banner.model';

const bannerQueries = {
  allKeys: ['banner'] as const,

  bannerListKey: (
    { page, is_active, banner_category_name }: BannerParams,
  ) => [...bannerQueries.allKeys, page, is_active, banner_category_name] as const,
  bannerList: ({ page, is_active, banner_category_name }: BannerParams) => queryOptions({
    queryKey: bannerQueries.bannerListKey({ page, is_active, banner_category_name }),
    queryFn: () => getBannerList({ page, is_active, banner_category_name }),
    select: (data) => {
      const banners: BannerTableHead[] = data.banners.map((banner) => ({
        id: banner.id,
        title: banner.title,
        image_url: banner.image_url,
        redirect_link: {
          web: banner.web_redirect_link ?? null,
          android: banner.android_redirect_link ?? null,
          ios: banner.ios_redirect_link ?? null,
        },
        is_active: banner.is_active,
        created_at: banner.created_at,
        priority: banner.priority ?? null,
      }));
      return {
        banners,
        total_count: data.total_count,
        current_count: data.current_count,
        total_page: data.total_page,
        current_page: data.current_page,
      };
    },
    enabled: !!banner_category_name,
  }),

  bannerKey: (id: number) => [...bannerQueries.allKeys, id] as const,
  banner: (id: number) => queryOptions({
    queryKey: bannerQueries.bannerKey(id),
    queryFn: () => getBanner({ id }),
  }),
};

export default bannerQueries;
