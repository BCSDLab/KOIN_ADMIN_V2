import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import { UsersResponse, UserTableHead } from 'model/user.model';

export const userApi = createApi({
  reducerPath: 'user',
  // 초기화용 태그
  tagTypes: ['users'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}/admin`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserList: builder.query<UserTableHead[], number>({
      query: (page) => `users/?page=${page}`,
      providesTags: ['users'],
      transformResponse:
        (usersResponse: UsersResponse): UserTableHead[] => usersResponse.items.map(({
          id, portal_account, identity, nickname, name,
        }) => ({
          key: id,
          id,
          portal_account,
          identity,
          nickname,
          name,
        })),
    }),
  }),
});

export const { useGetUserListQuery } = userApi;
