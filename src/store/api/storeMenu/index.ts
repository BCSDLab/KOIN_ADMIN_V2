import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';

import {
  MenusResponse,
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
  }),
});

export const {
  useGetMenusListQuery,
} = storeMenuApi;
