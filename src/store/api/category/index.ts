import { createApi } from '@reduxjs/toolkit/query/react';
import {
  CategoriesResponseV2, Category, CategoryOrderRequest, DropdownCategoryResponse,
} from 'model/category.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const categoryApi = createApi({
  reducerPath: 'category',
  tagTypes: ['categories', 'category'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getCategoryList: builder.query<CategoriesResponseV2, void>({
      query: () => ({ url: 'admin/shops/categories?limit=20' }),
      providesTags: (result) => (result
        ? [...result.map((category) => ({ type: 'category' as const, id: category.id })), { type: 'categories', id: 'LIST' }]
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

    getParentCategory: builder.query<DropdownCategoryResponse, void>({
      query: () => ({ url: 'admin/shops/parent-categories' }),
      providesTags: () => [{ type: 'category', name: 'parent' }],
    }),

    updateCategoryOrder: builder.mutation<string, CategoryOrderRequest>({
      query: (body) => ({
        url: 'admin/shops/categories/order',
        method: 'PUT',
        body,
      }),
      invalidatesTags: () => [{ type: 'category' }],
    }),
  }),
});

export const {
  useGetCategoryListQuery, useGetCategoryQuery, useAddCategoryMutation,
  useUpdateCategoryMutation, useDeleteCategoryMutation, useGetParentCategoryQuery,
  useUpdateCategoryOrderMutation,
} = categoryApi;
