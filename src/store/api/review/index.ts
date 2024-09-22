import { createApi } from '@reduxjs/toolkit/query/react';
import { GetReviewListParam, ReviewListResponse, SetReviewParam } from 'model/review.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const reviewApi = createApi({
  reducerPath: 'reviews',
  tagTypes: ['reviews'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getReviewList: builder.query<ReviewListResponse, GetReviewListParam>({
      query: ({ page, limit, isReported }) => ({ url: `admin/shops/reviews?page=${page}&limit=${limit}&${isReported ? 'is_reported=true' : ''}` }),
      providesTags: (result, error, { page }) => [{ type: 'reviews', id: page }],
    }),

    setReviewDismissed: builder.mutation<string, SetReviewParam>({
      query({ id, body }) {
        return {
          url: `admin/shops/reviews/${id}`,
          method: 'put',
          body,
        };
      },
      invalidatesTags: (result, error, { page }) => [{ type: 'reviews', id: page }],
    }),

    deleteReview: builder.mutation<void, { id: number, page: number }>({
      query({ id }) {
        return {
          url: `/admin/shops/reviews/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: (result, error, { page }) => [{ type: 'reviews', id: page }],
    }),
  }),
});

export const {
  useGetReviewListQuery, useSetReviewDismissedMutation, useDeleteReviewMutation,
} = reviewApi;
