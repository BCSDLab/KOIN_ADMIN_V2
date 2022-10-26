import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from 'model/auth.model';
import { RootState } from 'store';
import { API_PATH } from 'constant';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}/admin`,
    prepareHeaders: (headers, { getState }) => {
      // 토큰이 필요한 조회에는 헤더를 추가할 필요가 있음.
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // 요청 예시
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation } = authApi;
