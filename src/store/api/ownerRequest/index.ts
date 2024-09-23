import { createApi } from '@reduxjs/toolkit/query/react';
import {
  OwnerResponse, OwnerRequestListResponse, OwnersParam, OwnersResponse,
} from 'model/owner.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const ownerRequestApi = createApi({
  reducerPath: 'ownerRequest',
  tagTypes: ['ownerRequests', 'ownerRequest'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getOwnerRequestList: builder.query<OwnerRequestListResponse, OwnersParam>({
      query: ({ page }) => `admin/users/new-owners?page=${page}`,
      providesTags: (result) => (result
        ? [...result.owners.map((owner) => ({ type: 'ownerRequest' as const, id: owner.id })), { type: 'ownerRequests', id: 'LIST' }]
        : [{ type: 'ownerRequests', id: 'LIST' }]),
      transformResponse: (ownersResponse: OwnersResponse): OwnerRequestListResponse => {
        const tableHeaders = ownersResponse.owners.map((owner) => {
          return {
            id: owner.id,
            email: owner.email,
            name: owner.name,
            created_at: owner.created_at,
            shop_name: owner.shop_name,
          };
        });
        const totalPage = ownersResponse.total_page;
        return { owners: tableHeaders, totalPage };
      },
    }),

    getOwnerRequest: builder.query<OwnerResponse, number>({
      query: (id) => ({ url: `admin/users/owner/${id}` }),
      providesTags: (result, error, id) => [{ type: 'ownerRequest', id }],
    }),

    updateOwnerRequest: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/owner/${id}/authed`,
          method: 'PUT',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'ownerRequest', id }, { type: 'ownerRequests', id: 'LIST' }],
    }),

    deleteOwnerRequest: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'ownerRequest', id }, { type: 'ownerRequests', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetOwnerRequestListQuery, useGetOwnerRequestQuery, useUpdateOwnerRequestMutation,
  useDeleteOwnerRequestMutation,
} = ownerRequestApi;
