import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { CategoriesResponse, Category } from 'model/category.model';
import { RootState } from 'store';

export const categoryApi = createApi({
  reducerPath: 'category',
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
    getCategoryList: builder.query<CategoriesResponse, { page: number, size?: number }>({
      query: ({ page, size = 10 }) => ({ url: `admin/shops/categories?page=${page}&limit=${size}` }),
      providesTags: (result) => (result
        ? [...result.categories.map((category) => ({ type: 'category' as const, id: category.id })), { type: 'categories', id: 'LIST' }]
        : [{ type: 'categories', id: 'LIST' }]),
    }),

    getCategory: builder.query<Category, number>({
      query: (id) => ({ url: `admin/shops/categories/${id}` }),
      providesTags: (result, error, id) => [{ type: 'category', id }],
    }),

    addCategory: builder.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: 'admin/shops/categories',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'categories', id: 'LIST' }],
    }),

    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: ({ id, ...body }) => ({
        url: `admin/shops/categories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, id) => [{ type: 'categories', id: 'LIST' }, { type: 'category', id: Number(id) }],
    }),

    deleteCategory: builder.mutation<Category, number>({
      query: (id) => ({
        url: `admin/shops/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'categories', id: 'LIST' }, { type: 'category', id }],
    }),
  }),
});

export const {
  useGetCategoryListQuery, useGetCategoryQuery, useAddCategoryMutation,
  useUpdateCategoryMutation, useDeleteCategoryMutation,
} = categoryApi;
