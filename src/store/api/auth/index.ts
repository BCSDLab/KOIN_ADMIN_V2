import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, ChangePasswordRequest } from 'model/auth.model';

import baseQueryReauth from 'store/api/baseQueryReauth';

export const authApi = createApi({
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
  }),
});

export const { useLoginMutation, useProtectedMutation, useChangePasswordMutation } = authApi;
