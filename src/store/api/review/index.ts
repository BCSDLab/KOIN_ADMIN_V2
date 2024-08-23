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
      providesTags: () => [{ type: 'reviews' }],
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.isReported}`; // 캐시 키를 `isReported` 값을 포함하도록 수정
      },
      merge: (cached, newItem, { arg }) => {
        if (arg.page === 1) return newItem;
        cached.reviews.push(...newItem.reviews);
        return cached;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
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

    deleteReview: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/admin/shops/reviews/${id}`,
          method: 'delete',
        };
      },
      invalidatesTags: [{ type: 'reviews' }],
    }),
  }),
});

export const {
  useGetReviewListQuery, useSetReviewDismissedMutation, useDeleteReviewMutation,
} = reviewApi;
