import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import {
  OwnersResponse, OwnerTableHead, OwnersParam, OwnerResponse,
} from 'model/owner.model';
import { UserDetail } from 'model/user.model';

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
    getOwner: builder.query<OwnerResponse, number>({
      query: (id) => ({ url: `admin/users/owner/${id}` }),
      providesTags: (result, error, id) => [{ type: 'owner', id }],
    }),

    updateOwner: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/owner/${id}/authed`,
          method: 'PUT',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    }),

    // is_Deleted속성을 사용하기 위해 해당 속성이 있는 api를 호출
    getUserOwner: builder.query<UserDetail, number>({
      query: (id) => ({ url: `admin/users/${id}` }),
      providesTags: (result, error, id) => [{ type: 'owner', id }],
    }),

    // 아래 부분 수정하기. api연결하고 모델 정의하고.
    deleteOwner: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/users/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    }),

    undeleteOwner: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/users/${id}/undelete`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetOwnerListQuery, useGetOwnerQuery, useUpdateOwnerMutation, useGetUserOwnerQuery,
  useDeleteOwnerMutation, useUndeleteOwnerMutation,
} = ownerApi;
