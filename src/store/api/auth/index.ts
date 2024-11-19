import {
  BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, AdminInfo } from 'model/auth.model';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import { setCredentials } from 'store/slice/auth';

interface RefreshResponse {
  refresh_token: string;
  token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_PATH}/admin`,
  prepareHeaders: (headers, { getState }) => {
    // 토큰이 필요한 조회에는 헤더를 추가할 필요가 있음.
    const { token } = (getState() as RootState).auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryReauth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem('refresh_token');

  // 401 오류가 발생한다면 액세스 토큰 없음
  if (result.error && result.error.status === 401 && refreshToken) {
    // 리프레시 토큰을 통해 액세스 토큰을 재발급
    const refresh = await baseQuery(
      {
        url: '/user/refresh',
        method: 'POST',
        body: {
          refresh_token: refreshToken,
        },
      },
      api,
      extraOptions,
    ) as { data: RefreshResponse };

    if (refresh.data) {
      // 액세스 토큰을 가져오는데 성공한다면 스토리지에 값 저장
      localStorage.setItem('refresh_token', refresh.data.refresh_token);
      sessionStorage.setItem('token', refresh.data.token);
      // 액세스 토큰 갱신
      setCredentials({ token: refresh.data.token });

      // 액세스 토큰 갱신 후 다시 요청
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['admin'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: '/user/login',
        method: 'POST',
        body: {
          email: `${email}@koreatech.ac.kr`,
          password,
        },
      }),
    }),
    // 요청 예시
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),

    getAdminInfo: builder.query<AdminInfo, void>({
      query: () => ({
        url: '',
      }),
      providesTags: [{ type: 'admin', id: 'ADMIN' }],
    }),
  }),
});

export const { useLoginMutation, useProtectedMutation, useGetAdminInfoQuery } = authApi;
