import { createApi } from '@reduxjs/toolkit/query/react';
import {
  MenusResponse, MenuResponse, MutationMenuArgs, Menu,
} from 'model/menus.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const storeMenuApi = createApi({
  reducerPath: 'storeMenusApi',
  tagTypes: ['storeMenus', 'storeMenu'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getMenusList: builder.query<MenusResponse, number>({
      query: (id) => ({ url: `/admin/shops/${id}/menus` }),
      providesTags: [{ type: 'storeMenus', id: 'LIST' }],
    }),

    getMenu: builder.query<MenuResponse, { id: number; menuId: number }>({
      query: ({ id: shopId, menuId }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'GET',
      }),
      providesTags: (result, error, { id, menuId }) => [{ type: 'storeMenu', id, menuId }],
    }),

    updateMenu: builder.mutation<MenusResponse, MutationMenuArgs>({
      query: ({ id: shopId, menuId, menuData: body }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id, menuId }) => [{ type: 'storeMenu', id, menuId }, { type: 'storeMenus', id: 'LIST' }],
    }),

    deleteMenu: builder.mutation < MenusResponse, Pick<MutationMenuArgs, 'id' | 'menuId' >>({
      query: ({ id: shopId, menuId }) => ({
        url: `/admin/shops/${shopId}/menus/${menuId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, menuId }) => [{ type: 'storeMenu', id, menuId }, { type: 'storeMenus', id: 'LIST' }],
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
  useGetMenusListQuery, useGetMenuQuery, useUpdateMenuMutation, useDeleteMenuMutation,
  useAddMenuMutation,
} = storeMenuApi;
