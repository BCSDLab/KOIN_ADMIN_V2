import { createApi } from '@reduxjs/toolkit/query/react';
import { HistorysRequest, HistorysResponse } from 'model/history.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  tagTypes: ['historys'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getHistorys: builder.query<HistorysResponse, HistorysRequest>({
      query: ({ page, domainId = null, limit = 30 }) => ({
        url: `admin/historys?page=${page}&limit=${limit}${domainId ? `&domainId=${domainId}` : ''}`,
      }),
      providesTags: [{ type: 'historys', id: 'HISTORYS' }],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetHistorysQuery,
} = historyApi;
