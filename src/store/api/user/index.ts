import { createApi } from '@reduxjs/toolkit/query/react';
import { UserDetail, UsersResponse, UserTableHead } from 'model/user.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const userApi = createApi({
  reducerPath: 'user',
  tagTypes: ['users', 'user'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getUserList: builder.query<{ students: UserTableHead[]; totalPage: number }, number>({
      query: (page) => `admin/students?page=${page}`,
      providesTags: (result) => (result
        ? [...result.students.map((user) => ({ type: 'user' as const, id: user.id })), { type: 'users', id: 'LIST' }]
        : [{ type: 'users', id: 'LIST' }]),
      transformResponse: (usersResponse: UsersResponse) => ({
        students: usersResponse.students,
        totalPage: usersResponse.total_page,
      }),
    }),

    getUser: builder.query<UserDetail, number>({
      query: (id) => `admin/users/student/${id}`,
      providesTags: (result, error, id) => [{ type: 'user', id }],
    }),

    getNicknameCheck: builder.mutation<{ success: string }, string>({
      query: (nickname) => `user/check/nickname?nickname=${nickname}`,
    }),

    updateUser: builder.mutation<void, Pick<UserDetail, 'id'> & Partial<UserDetail>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/users/student/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'user', id }],
    }),
  }),
});

export const {
  useGetUserListQuery, useGetUserQuery, useGetNicknameCheckMutation, useUpdateUserMutation,
} = userApi;
