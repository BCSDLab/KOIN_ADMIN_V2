import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { GetReviewListParam, ReviewListResponse, SetReviewParam } from 'model/review.model';
import { RootState } from 'store';

export const reviewApi = createApi({
  reducerPath: 'reviews',
  tagTypes: ['reviews'],

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

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
      invalidatesTags: [{ type: 'reviews' }],
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
