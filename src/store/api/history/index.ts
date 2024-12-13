import { createApi } from '@reduxjs/toolkit/query/react';
import { HistoriesRequest, HistoriesResponse } from 'model/history.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const historyApi = createApi({
  reducerPath: 'historyApi',
  tagTypes: ['histories'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getHistories: builder.query<HistoriesResponse, HistoriesRequest>({
      query: ({ page, domainId = null, limit = 30 }) => ({
        url: `admin/histories?page=${page}&limit=${limit}${domainId ? `&domainId=${domainId}` : ''}`,
      }),
      providesTags: [{ type: 'histories', id: 'HISTORIES' }],
    }),
  }),
  refetchOnMountOrArgChange: true,
});

export const {
  useGetHistoriesQuery,
} = historyApi;
