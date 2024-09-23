import { createApi } from '@reduxjs/toolkit/query/react';
import {
  StoreDetailForm,
  StoreParams, StoreResponse, StoreTransformResponse, StoresResponse,
} from 'model/store.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: ['stores', 'store'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getStoreList: builder.query<StoreTransformResponse, StoreParams>({
      query: ({ page, is_deleted }) => ({ url: `admin/shops?page=${page}&is_deleted=${is_deleted}` }),
      providesTags: (result) => (result
        ? [...result.shops.map((store) => ({ type: 'store' as const, id: store.id })), { type: 'stores', id: 'LIST' }]
        : [{ type: 'stores', id: 'LIST' }]),
      transformResponse: (response: StoresResponse) => ({
        ...response,
        shops: response.shops.map((store) => ({
          ...store,
          category_names: store.category_names.join(', '),
        })),
      }),
    }),

    getStore: builder.query<StoreDetailForm, number>({
      query: (id) => ({ url: `admin/shops/${id}` }),
      providesTags: (result, error, id) => [{ type: 'store', id }],
      transformResponse: (response: StoreResponse) => ({
        ...response,
        category_ids: response.shop_categories.map((category) => category.id),
      }),
    }),

    updateStore: builder.mutation<void, Pick<StoreResponse, 'id'> & Partial<StoreDetailForm>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/shops/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'store', id }, { type: 'stores', id: 'LIST' }],
    }),

    deleteStore: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/shops/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ((result, error, id) => [{ type: 'store', id }, { type: 'stores', id: 'LIST' }]),
    }),

    addStore: builder.mutation<StoreResponse, Partial<StoreResponse>>({
      query: (body) => ({
        url: 'admin/shops',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'stores', id: 'LIST' }],
    }),

    undeleteStore: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `admin/shops/${id}/undelete`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'store', id }, { type: 'stores', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetStoreListQuery, useGetStoreQuery, useUndeleteStoreMutation,
  useUpdateStoreMutation, useDeleteStoreMutation, useAddStoreMutation,
} = storeApi;
