import { createApi } from '@reduxjs/toolkit/query/react';
import {
  BenefitCategoryResponse, GetBenefitShopsResponse, SearchResponse,
  CreateBenefitResponse, CreateBenefitRequest,
} from 'model/benefit.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const benefitApi = createApi({
  reducerPath: 'benefit',
  tagTypes: ['benefits', 'benefit'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getBenefitCategory: builder.query<BenefitCategoryResponse, void>({
      query: () => ({ url: 'admin/benefit/categories' }),
      providesTags: () => [{ type: 'benefit', id: 'category' }],
    }),
    getBenefitShops: builder.query<GetBenefitShopsResponse, number | undefined>({
      query: (id) => ({ url: `admin/benefit/${id}/shops` }),
      providesTags: (result, error, id) => [{ type: 'benefit', id }],
    }),
    searchShops: builder.query<SearchResponse, { id: number | undefined, keyword: string }>({
      query: ({ id, keyword }) => ({ url: `admin/benefit/${id}/shops/search?search_keyword=${keyword}` }),
      providesTags: (result, error, { id, keyword }) => [{ type: 'benefit', id, keyword }],
    }),
    createBenefitCategory: builder.mutation<CreateBenefitResponse, CreateBenefitRequest>({
      query(req) {
        return {
          url: 'admin/benefit/categories',
          method: 'post',
          body: req,
        };
      },
      invalidatesTags: () => [{ type: 'benefit' }],
    }),
    deleteBenefitCategory: builder.mutation<void, { id: number }>({
      query({ id }) {
        return {
          url: `admin/benefit/categories/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: () => [{ type: 'benefit' }],
    }),
  }),
});

export const {
  useGetBenefitCategoryQuery, useGetBenefitShopsQuery, useSearchShopsQuery,
  useCreateBenefitCategoryMutation, useDeleteBenefitCategoryMutation,
} = benefitApi;
