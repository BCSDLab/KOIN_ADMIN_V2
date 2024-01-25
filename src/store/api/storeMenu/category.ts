import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { MenuCategories } from 'model/menuCategory';
import { MenuCategory } from 'model/menus.model';
import { RootState } from 'store';

export const menuCategoriesApi = createApi({
  reducerPath: 'menuCategoriesApi',
  tagTypes: ['menuCategories'],

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
