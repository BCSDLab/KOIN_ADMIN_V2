import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryReauth from 'store/api/baseQueryReauth';
import { UpdateListRequest, UpdateListResponse } from 'model/updateList.model';

export const updateListApi = createApi({
  reducerPath: 'updateListApi',
  tagTypes: ['updateList'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getUpdateList: builder.query<UpdateListResponse, UpdateListRequest>({
      query: ({ page, type, limit = 10 }) => ({
        url: `admin/version/history/${type}?page=${page}&limit=${limit}`,
      }),
      providesTags: [{ type: 'updateList', id: 'UPDATELIST' }],
    }),
  }),
});

export const {
  useGetUpdateListQuery,
} = updateListApi;
