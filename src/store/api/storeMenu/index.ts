import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';

import {
  MenusResponse, MenuResponse, MutationMenuArgs, Menu,
} from 'model/menus.model';
import { RootState } from 'store';

export const storeMenuApi = createApi({
  reducerPath: 'storeMenusApi',
  tagTypes: ['storeMenus', 'storeMenu'],

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
    getMenusList: builder.query<MenusResponse, number>({
      query: (id) => ({ url: `/admin/shops/${id}/menus` }),
      providesTags: (result) => (
        result
          ? [
            ...result.menu_categories.flatMap((category) => category.menus.map((menu) => ({ type: 'storeMenu' as const, id: menu.id }))),
            { type: 'storeMenus', id: 'LIST' },
          ]
          : [{ type: 'storeMenus', id: 'LIST' }]
      ),
    }),

    getMenuList: builder.query<MenuResponse, { id: number; menuId?: number }>({
      query: ({ id: shopId, menuId }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id }) => [{ type: 'storeMenu', id }],
    }),

    updateMenu: builder.mutation<MenusResponse, MutationMenuArgs>({
      query: ({ id: shopId, menuId, menuData: body }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'storeMenu', id }, { type: 'storeMenus', id: 'LIST' }],
    }),

    deleteMenu: builder.mutation < MenusResponse, Pick<MutationMenuArgs, 'id' | 'menuId' >>({
      query: ({ id: shopId, menuId }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'storeMenu', id }, { type: 'storeMenus', id: 'LIST' }],
    }),

    addMenu: builder.mutation<Menu, { id: number; formData: Menu }>({
      query: ({ id: shopId, formData }) => ({
        url: `/admin/shops/${shopId}/menus`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'storeMenu', id }, { type: 'storeMenus', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetMenusListQuery, useGetMenuListQuery, useUpdateMenuMutation, useDeleteMenuMutation,
  useAddMenuMutation,
} = storeMenuApi;
