import { createApi } from '@reduxjs/toolkit/query/react';
import {
  LoginRequest, LoginResponse, AdminInfo, ChangePasswordRequest,
} from 'model/auth.model';

import baseQueryReauth from 'store/api/baseQueryReauth';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['admin'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: 'admin/user/login',
        method: 'POST',
        body: {
          email: `${email}@koreatech.ac.kr`,
          password,
        },
      }),
    }),
    // 요청 예시
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'admin/protected',
    }),
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: ({ old_password, new_password }) => ({
        url: 'admin/password',
        method: 'PUT',
        body: { old_password, new_password },
      }),
    }),

    getAdminInfo: builder.query<AdminInfo, void>({
      query: () => ({
        url: 'admin',
      }),
      providesTags: [{ type: 'admin', id: 'ADMIN' }],
    }),
  }),
});

export const {
  useLoginMutation, useProtectedMutation, useGetAdminInfoQuery, useChangePasswordMutation,
} = authApi;
