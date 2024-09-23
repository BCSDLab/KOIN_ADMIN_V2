import { createApi } from '@reduxjs/toolkit/query/react';
import { MenuCategories } from 'model/menuCategory';
import { MenuCategory } from 'model/menus.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const menuCategoriesApi = createApi({
  reducerPath: 'menuCategoriesApi',
  tagTypes: ['menuCategories'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getMenuCategories: builder.query<MenuCategories, number>({
      query: (id) => ({ url: `/admin/shops/${id}/menus/categories` }),
      providesTags: (result, error, id) => [{ type: 'menuCategories', id }],
    }),

    addMenuCategories: builder.mutation<MenuCategory, Partial<MenuCategory>>({
      query: ({ id, name }) => ({
        url: `/admin/shops/${id}/menus/categories`,
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: [{ type: 'menuCategories' }],
    }),

  }),
});

export const {
  useGetMenuCategoriesQuery,
  useAddMenuCategoriesMutation,
} = menuCategoriesApi;
