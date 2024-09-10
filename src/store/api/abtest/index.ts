import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ABTestResponse, NewABTest, NewABTestResponse } from 'model/abTest.model';
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
    addABTest: builder.mutation<NewABTestResponse, Partial<NewABTest>>({
      query: (body) => ({
        url: '/abtest',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'ABTest', id: 'LIST' }],
    }),

  }),
});

export const { useGetABTestsQuery, useAddABTestMutation } = abTestApi;
