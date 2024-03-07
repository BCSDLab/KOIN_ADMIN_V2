import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import {
  OwnerResponse, OwnersParam, OwnerListResponse, OwnersResponse,
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
    getOwnerList: builder.query<OwnerListResponse, OwnersParam>({
      query: ({ page }) => `admin/users/owners/?page=${page}`,
      providesTags: (result) => (result
        ? [...result.owners.map((owner) => ({ type: 'owner' as const, id: owner.id })), { type: 'owners', id: 'LIST' }]
        : [{ type: 'owners', id: 'LIST' }]),
      transformResponse: (ownersResponse: OwnersResponse):OwnerListResponse => {
        const tableHeaders = ownersResponse.owners.map((owner) => {
          return {
            id: owner.id,
            email: owner.email,
            name: owner.name,
            created_at: owner.created_at,
            phone_number: owner.phone_number,
          };
        });
        const totalPage = ownersResponse.total_page;
        return { owners: tableHeaders, totalPage };
      },
    }),

    getOwner: builder.query<OwnerResponse, number>({
      query: (id) => ({ url: `admin/users/owner/${id}` }),
      providesTags: (result, error, id) => [{ type: 'owner', id }],
    }),

    updateOwner: builder.mutation<void, Pick<OwnerResponse, 'id'> & Partial<OwnerResponse>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/users/owner/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    }),

    deleteOwner: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOwnerListQuery, useGetOwnerQuery, useUpdateOwnerMutation,
  useDeleteOwnerMutation,
} = ownerApi;
