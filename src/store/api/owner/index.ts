import { createApi } from '@reduxjs/toolkit/query/react';
import {
  OwnerResponse, OwnersParam, OwnerListResponse, OwnersResponse,
} from 'model/owner.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const ownerApi = createApi({
  reducerPath: 'owner',
  tagTypes: ['owners', 'owner'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getOwnerList: builder.query<OwnerListResponse, OwnersParam>({
      query: ({ page }) => `admin/users/owners?page=${page}`,
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
