import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ABTestResponse, ModifyABTest, ABTest, NewABTestResponse,
} from 'model/abTest.model';
import { RootState } from 'store';

export const abTestApi = createApi({
  reducerPath: 'abTestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_PATH_TEST}`,
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
        data,
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
  }),
});

export const {
  useGetABTestsQuery, useGetABTestQuery, useAddABTestMutation, useModifyABTestMutation,
} = abTestApi;
