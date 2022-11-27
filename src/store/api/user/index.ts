import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import { UserDetail, UsersResponse, UserTableHead } from 'model/user.model';

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['users', 'user'],
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
    getUserList: builder.query<{ userList: UserTableHead[], totalPage: number }, number>({
      query: (page) => `admin/users/?page=${page}`,
      providesTags: ['users'],
      transformResponse:
        (usersResponse: UsersResponse): { userList: UserTableHead[], totalPage: number } => {
          const tableData = usersResponse.items.map(({
            id, portal_account, identity, nickname, name,
          }) => ({
            id,
            portal_account,
            identity,
            nickname,
            name,
          }));

          return {
            userList: tableData,
            totalPage: usersResponse.totalPage,
          };
        },
    }),

    getUser: builder.query<UserDetail, number>({
      query: (id) => `admin/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'user', id }],
    }),

    getNicknameCheck: builder.mutation<{ success: string }, string>({
      query: (nickname) => `user/check/nickname/${nickname}`,
    }),

    updateUser: builder.mutation<void, Pick<UserDetail, 'id'> & Partial<UserDetail>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/users/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => ['users', { type: 'user', id }],
    }),
  }),
});

export const {
  useGetUserListQuery, useGetUserQuery, useGetNicknameCheckMutation, useUpdateUserMutation,
} = userApi;
