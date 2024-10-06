import { createApi } from '@reduxjs/toolkit/query/react';
import {
  NoticeRequest,
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

    addNotice: builder.mutation<NoticeRequest, Partial<NoticeRequest>>({
      query: (body) => ({
        url: 'admin/notice',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'notices', id: 'LIST' }],
    }),

    updateNotice: builder.mutation<string, Pick<NoticeResponse, 'id'> & Partial<NoticeRequest>>({
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

    deleteNotice: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/notice/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'notice', id }, { type: 'notices', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNoticeListQuery, useGetNoticeQuery,
  useAddNoticeMutation, useUpdateNoticeMutation, useDeleteNoticeMutation,
} = noticeApi;
