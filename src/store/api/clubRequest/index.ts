import { createApi } from '@reduxjs/toolkit/query/react';
import { ClubListParams, PendingClub, PendingClubResponse } from 'model/clubRequest.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const clubRequestApi = createApi({
  reducerPath: 'clubRequest',
  tagTypes: ['clubRequest', 'clubRequests'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getPendingClubList:
      builder.query<PendingClubResponse, ClubListParams>({
        query: ({ page, limit, sort }) => {
          const params = new URLSearchParams({ page: String(page) });
          if (limit) {
            params.append('limit', String(limit));
          }
          if (sort) {
            params.append('sort', sort);
          }
          return {
            url: `admin/clubs/pending?${params.toString()}`,
          };
        },
        providesTags: (result) => (result
          ? [...result.clubs.map((club) => ({ type: 'clubRequest' as const, id: club.club_id })), { type: 'clubRequests', id: 'LIST' }]
          : [{ type: 'clubRequests', id: 'LIST' }]),
      }),

    getAcceptedClubList:
      builder.query<PendingClubResponse, ClubListParams>({
        query: ({ page, limit, sort }) => {
          const params = new URLSearchParams({ page: String(page) });
          if (limit) {
            params.append('limit', String(limit));
          }
          if (sort) {
            params.append('sort', sort);
          }
          return {
            url: `admin/clubs/managers?${params.toString()}`,
          };
        },
        providesTags: (result) => (result
          ? [...result.clubs.map((club) => ({ type: 'clubRequest' as const, id: club.club_id })), { type: 'clubRequests', id: 'LIST' }]
          : [{ type: 'clubRequests', id: 'LIST' }]),
      }),

    getPendingClub:
      builder.mutation<PendingClub, { club_name: string }>({
        query: (body) => ({
          url: 'admin/clubs/pending',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: 'clubRequests', id: 'LIST' }],
      }),

    decidePendingClub: builder.mutation<void, { club_name: string; is_accept: boolean }>({
      query: (body) => ({
        url: 'admin/clubs/decision',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'clubRequests', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetPendingClubListQuery, useGetAcceptedClubListQuery, useGetPendingClubMutation,
  useDecidePendingClubMutation,
} = clubRequestApi;
