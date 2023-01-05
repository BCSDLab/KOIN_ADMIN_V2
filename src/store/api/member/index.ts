import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import { MemberTableHead, MembersParam, MembersResponse } from 'model/member.model';

export const memberApi = createApi({
  reducerPath: 'member',
  tagTypes: ['members', 'member'],
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
    getMemberList: builder.query<{
      memberList: MemberTableHead[],
      totalPage: number
    }, MembersParam>({
      query: ({ page, track }) => `admin/members/?page=${page}&track=${track}&limit=50`,
      providesTags: (result) => (result
        ? [...result.memberList.map((member) => ({ type: 'member' as const, id: member.id })), { type: 'members', id: 'LIST' }]
        : [{ type: 'members', id: 'LIST' }]),
      transformResponse: (membersResponse: MembersResponse) => ({
        memberList: membersResponse.members,
        totalPage: membersResponse.total_page,
      }),
    }),
  }),
});

export const { useGetMemberListQuery } = memberApi;
