import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { CategoriesResponse } from 'model/category.model';
import { RootState } from 'store';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['categories', 'category'],

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
    getCategoryList: builder.query<CategoriesResponse, number>({
      query: (page) => ({ url: `admin/shops/categories?page=${page}` }),
      providesTags: (result) => (result
        ? [...result.categories.map((category) => ({ type: 'category' as const, id: category.id })), { type: 'categories', id: 'LIST' }]
        : [{ type: 'categories', id: 'LIST' }]),
    }),
  }),
});

export const { useGetCategoryListQuery } = categoryApi;
