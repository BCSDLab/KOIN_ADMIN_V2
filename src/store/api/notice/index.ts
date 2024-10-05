import { createApi } from '@reduxjs/toolkit/query/react';
import {
  NoticesParam, NoticesResponse,
} from 'model/notice.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const noticeApi = createApi({
  reducerPath: 'notice',
  tagTypes: ['notices', 'notice'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getNoticeList: builder.query<NoticesResponse, NoticesParam>({
      query: ({ page, is_deleted }) => `admin/notice?page=${page}&limit=1&is_deleted=${is_deleted}`,
      providesTags: (result) => (result
        ? [...result.notices.map((notice) => ({ type: 'notice' as const, id: notice.id })), { type: 'notices', id: 'LIST' }]
        : [{ type: 'notices', id: 'LIST' }]),
    }),

    // getOwner: builder.query<OwnerResponse, number>({
    //   query: (id) => ({ url: `admin/users/owner/${id}` }),
    //   providesTags: (result, error, id) => [{ type: 'owner', id }],
    // }),

    // updateOwner: builder.mutation<void, Pick<OwnerResponse, 'id'> & Partial<OwnerResponse>>({
    //   query(data) {
    //     const { id, ...body } = data;
    //     return {
    //       url: `admin/users/owner/${id}`,
    //       method: 'PUT',
    //       body,
    //     };
    //   },
    //   invalidatesTags: (result, error, { id }) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    // }),

    // deleteOwner: builder.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `admin/users/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (result, error, id) => [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    // }),
    // owner에서 가져와서 작업하고 있어요. 그쪽 참고하면 될 듯 합니당
  }),
});

export const {
  useGetNoticeListQuery,
} = noticeApi;
