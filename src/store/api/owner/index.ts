import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import {
  OwnersResponse, OwnerTableHead, OwnersParam,
} from 'model/owner.model';

export const ownerApi = createApi({
  reducerPath: 'owner',
  tagTypes: ['owners', 'owner'],
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
    getOwnerList: builder.query<{
      ownerList: OwnerTableHead[],
      totalPage: number
    }, OwnersParam>({
      query: ({ page }) => `admin/new-owners/?page=${page}`,
      providesTags: (result) => (result
        ? [...result.ownerList.map((owner) => ({ type: 'owner' as const, id: owner.id })), { type: 'owners', id: 'LIST' }]
        : [{ type: 'owners', id: 'LIST' }]),
      transformResponse: (ownersResponse: OwnersResponse) => ({
        ownerList: ownersResponse.owners,
        totalPage: ownersResponse.total_page,
      }),
    }),
  }),
});

export const { useGetOwnerListQuery } = ownerApi;
