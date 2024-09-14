import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ABTestResponse, ModifyABTest,
  ABTest, NewABTestResponse,
  ABTestUsersResponse, ABTestUserUserIDResponse,
  ABTestUserMoveRequest, ABTestAssignRequest, ABTestAssignResponse, ABTestWinnerRequest,
} from 'model/abTest.model';
import { RootState } from 'store';

export const abTestApi = createApi({
  reducerPath: 'abTestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['ABTest'],
  endpoints: (builder) => ({
    getABTests: builder.query<ABTestResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `abtest?page=${page}&limit=${limit}`,
      providesTags: (result) => (result
        ? [
          ...result.tests.map(({ id }) => ({ type: 'ABTest' as const, id })),
          { type: 'ABTest', id: 'LIST' },
        ]
        : [{ type: 'ABTest', id: 'LIST' }]),
    }),
    getABTest: builder.query<Partial<NewABTestResponse>, number | string | undefined>({
      query: (id) => `abtest/${id}`,
      providesTags: (result, error, id) => [{ type: 'ABTest', id }],
    }),
    addABTest: builder.mutation<NewABTestResponse, Partial<ABTest>>({
      query: (data) => ({
        url: '/abtest',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'ABTest', id: 'LIST' }],
    }),
    modifyABTest: builder.mutation<NewABTestResponse, Partial<ModifyABTest>>({
      query: ({ id, data }) => ({
        url: `/abtest/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'ABTest', id },
        { type: 'ABTest', id: 'LIST' },
      ],
    }),
    deleteABTest: builder.mutation<NewABTestResponse, number | string | undefined>({
      query: (id) => ({
        url: `/abtest/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'ABTest', id }, { type: 'ABTest', id: 'LIST' }],
    }),
    getUserByName: builder.query<ABTestUsersResponse, string>({
      query: (name) => ({
        url: '/abtest/user',
        params: {
          name,
        },
      }),
    }),
    getUserByID: builder.query<ABTestUserUserIDResponse, string | number>({
      query: (id) => ({
        url: `/abtest/user/${id}/device`,
      }),
    }),
    moveUser: builder.mutation<void, ABTestUserMoveRequest>({
      query: (data) => ({
        url: `/abtest/${data.id}/move`,
        method: 'POST',
        body: data.data,
      }),
    }),
    postWinner: builder.mutation<void, ABTestWinnerRequest>({
      query: (data) => ({
        url: `/abtest/close/${data.id}`,
        method: 'POST',
        body: { winner_name: data.winner_name },
      }),
      invalidatesTags: [{ type: 'ABTest', id: 'LIST' }],
    }),
    // 테스트 요청
    getFirstMyPage: builder.query< ABTestAssignResponse, ABTestAssignRequest>({
      query: (data) => ({
        url: '/abtest/assign',
        method: 'POST',
        headers: {
          access_history_id: `${data.access_history_id}`,
        },
        body: data.title,
      }),
    }),
    getMyPage: builder.query< ABTestAssignResponse, ABTestAssignRequest>({
      query: (data) => ({
        url: '/abtest/me',
        method: 'GET',
        headers: {
          access_history_id: `${data.access_history_id}`,
        },
        body: data.title,
      }),
    }),
  }),
});

export const {
  useGetABTestsQuery, useGetABTestQuery,
  useAddABTestMutation, useModifyABTestMutation, useDeleteABTestMutation,
  useGetUserByNameQuery, useGetUserByIDQuery, useMoveUserMutation, usePostWinnerMutation,
  useGetFirstMyPageQuery, useGetMyPageQuery,
} = abTestApi;
