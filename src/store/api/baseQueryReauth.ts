import {
  BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { setCredentials } from 'store/slice/auth';
import { API_PATH } from 'constant';
import { RootState } from 'store';

interface RefreshResponse {
  refresh_token: string;
  token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_PATH}`,
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

  // 401 오류가 발생한다면 액세스 토큰 만료일 가능성이 높음
  if (result.error && result.error.status === 401 && refreshToken) {
    // 리프레시 토큰을 통해 액세스 토큰을 재발급
    const refresh = await baseQuery(
      {
        url: '/user/refresh',
        method: 'POST',
        body: {
          refresh_token: refreshToken,
        },
        headers: undefined,
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
    } else {
      throw new Error('refresh failed');
    }
  }

  return result;
};

export default baseQueryReauth;
