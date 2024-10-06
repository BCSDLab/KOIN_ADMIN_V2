import { createApi } from '@reduxjs/toolkit/query/react';
import {
  NoticeUpdateRequest,
  NoticeResponse,
  NoticesParam, NoticesResponse, TransformedNoticesResponse,
} from 'model/notice.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const noticeApi = createApi({
  reducerPath: 'notice',
  tagTypes: ['notices', 'notice'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getNoticeList: builder.query<TransformedNoticesResponse, NoticesParam>({
      query: ({ page, is_deleted }) => `admin/notice?page=${page}&limit=1&is_deleted=${is_deleted}`,
      providesTags: (result) => (result
        ? [...result.notices.map((notice) => ({ type: 'notice' as const, id: notice.id })), { type: 'notices', id: 'LIST' }]
        : [{ type: 'notices', id: 'LIST' }]),
      transformResponse: (res: NoticesResponse): TransformedNoticesResponse => {
        const notices = res.notices.map((notice) => {
          return {
            id: notice.id,
            post_number: notice.id,
            title: notice.title,
            author: notice.author,
            post_date: notice.created_at,
          };
        });
        return { notices, total_page: res.total_page };
      },
    }),

    getNotice: builder.query<NoticeResponse, number>({
      query: (id) => ({ url: `admin/notice/${id}` }),
      providesTags: (result, error, id) => [{ type: 'notice', id }],
    }),

    updateNotice: builder.mutation<string, Pick<NoticeResponse, 'id'> & Partial<NoticeUpdateRequest>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/notice/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'notice', id }, { type: 'notices', id: 'LIST' }],
    }),

    // deleteOwner: builder.mutation<{ success: boolean; id: number }, number>({
    //   query(id) {
    //     return {
    //       url: `admin/users/${id}`,
    //       method: 'DELETE',
    //     };
    //   },
    //   invalidatesTags: (result, error, id) =>
    // [{ type: 'owner', id }, { type: 'owners', id: 'LIST' }],
    // }),
    // owner에서 가져와서 작업하고 있어요. 그쪽 참고하면 될 듯 합니당
  }),
});

export const {
  useGetNoticeListQuery, useGetNoticeQuery, useUpdateNoticeMutation,
} = noticeApi;
