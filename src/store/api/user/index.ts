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
    // builder.query<리턴 타입, 갱신 인자(여기선 page)>
    getUserList: builder.query<{ userList: UserTableHead[], totalPage: number }, number>({
      query: (page) => `users/?page=${page}`,
      providesTags: ['users'],
      transformResponse:
        (usersResponse: UsersResponse): { userList: UserTableHead[], totalPage: number } => {
          // 테이블에 보여주고 싶은 값들만 꺼내기
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
  }),
});

export const { useGetUserListQuery } = userApi;
