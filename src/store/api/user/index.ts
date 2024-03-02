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
