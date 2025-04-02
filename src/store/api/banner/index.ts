import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Banner, BannerParams, BannerPriorityParams,
  BannerRequest,
  BannersResponse, BannerTableHead, BannerTransformResponse,
} from 'model/banner.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const bannerApi = createApi({
  reducerPath: 'banners',
  tagTypes: ['banners', 'banner'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getBannerList:
    builder.query<BannerTransformResponse, BannerParams>({
      query: ({ page, is_active, banner_category_name }) => {
        const params = new URLSearchParams({ page: String(page), banner_category_name });
        if (is_active !== undefined) params.append('is_active', String(is_active));

        return {
          url: `admin/banners?${params.toString()}`,
        };
      },
      providesTags: (result) => (result
        ? [...result.banners.map((banner) => ({ type: 'banner' as const, id: banner.id })), { type: 'banners', id: 'LIST' }]
        : [{ type: 'banners', id: 'LIST' }]),
      transformResponse: (response: BannersResponse): BannerTransformResponse => {
        const banners: BannerTableHead[] = response.banners.map((banner) => ({
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
          total_count: response.total_count,
          current_count: response.current_count,
          total_page: response.total_page,
          current_page: response.current_page,
        };
      },
    }),

    getBanner: builder.query<Banner, number>({
      query: (id) => ({ url: `admin/banners/${id}` }),
      providesTags: (result, error, id) => [{ type: 'banner', id }],
    }),

    addBanner: builder.mutation<Banner, Partial<Banner>>({
      query: (body) => ({
        url: 'admin/banners',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'banners', id: 'LIST' }],
    }),

    updateBanner: builder.mutation<void, Pick<Banner, 'id'> & Partial<BannerRequest>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/banners/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'banner', id }, { type: 'banners', id: 'LIST' }],
    }),

    deleteBanner: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `admin/banners/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ((result, error, id) => [{ type: 'banner', id }, { type: 'banners', id: 'LIST' }]),
    }),

    updateBannerPriority: builder.mutation<void, { id: number, body: BannerPriorityParams }>({
      query: ({ id, body }) => ({
        url: `admin/banners/${id}/priority`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'banner', id }, { type: 'banners', id: 'LIST' }],
    }),

    toggleBannerActive: builder.mutation<void, { id: number; body: { is_active: boolean } }>({
      query: ({ id, body }) => ({
        url: `admin/banners/${id}/active`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'banner', id }, { type: 'banners', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetBannerListQuery, useGetBannerQuery, useAddBannerMutation,
  useUpdateBannerMutation, useDeleteBannerMutation, useUpdateBannerPriorityMutation,
  useToggleBannerActiveMutation,
} = bannerApi;
