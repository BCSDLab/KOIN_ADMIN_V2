import { createApi } from '@reduxjs/toolkit/query/react';
import { CategoriesResponse, Category } from 'model/category.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const categoryApi = createApi({
  reducerPath: 'category',
  tagTypes: ['categories', 'category'],

  baseQuery: baseQueryReauth,

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
