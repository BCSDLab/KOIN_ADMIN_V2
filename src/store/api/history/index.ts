import { createApi } from '@reduxjs/toolkit/query/react';
import { HistorysRequest, HistorysResponse } from 'model/history.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  tagTypes: ['historys'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getHistorys: builder.query<HistorysResponse, HistorysRequest>({
      query: ({ page, limit = 30 }) => ({
        url: `admin/historys?page=${page}&limit=${limit}`,
      }),
      providesTags: [{ type: 'historys', id: 'HISTORYS' }],
    }),
  }),
});

export const {
  useGetHistorysQuery,
} = historyApi;
