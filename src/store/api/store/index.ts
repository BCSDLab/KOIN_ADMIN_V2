import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import {
  StoreParams, StoreResponse, StoreTransFormResponse, StoresResponse,
} from 'model/store.model';
import { RootState } from 'store';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  tagTypes: ['stores', 'store'],

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getStoreList: builder.query<StoreTransFormResponse, StoreParams>({
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

    getStore: builder.query<StoreResponse, number>({
      query: (id) => ({ url: `admin/shops/${id}` }),
      providesTags: (result, error, id) => [{ type: 'store', id }],
    }),

    updateStore: builder.mutation<void, Pick<StoreResponse, 'id'> & Partial<StoreResponse>>({
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
