import { createApi } from '@reduxjs/toolkit/query/react';
import { BannerCategoriesResponse, BannerCategory } from 'model/bannerCategory.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const bannerCategoryApi = createApi({
  reducerPath: 'banner-category',
  tagTypes: ['bannerCategories', 'bannerCategory'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getBannerCategoryList: builder.query<BannerCategoriesResponse, void>({
      query: () => ({ url: 'admin/banner-categories' }),
      providesTags: (result) => (result
        ? [
          ...result.banner_categories.map((bannerCategory) => ({
            type: 'bannerCategory' as const,
            id: bannerCategory.id,
          })),
          { type: 'bannerCategories', id: 'LIST' },
        ]
        : [{ type: 'bannerCategories', id: 'LIST' }]),
    }),

    updateBannerCategoryDescription: builder.mutation<BannerCategory, Partial<BannerCategory>>({
      query: ({ id, ...body }) => ({
        url: `admin/banner-categories/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'bannerCategory', id }, { type: 'bannerCategories', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBannerCategoryListQuery, useUpdateBannerCategoryDescriptionMutation,
} = bannerCategoryApi;
