import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Club, ClubCategoryResponse, ClubParams, ClubRequest, ClubResponse,
} from 'model/club.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const clubApi = createApi({
  reducerPath: 'clubs',
  tagTypes: ['clubs', 'club'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getClubList:
      builder.query<ClubResponse, ClubParams>({
        query: ({ page, club_category_id }) => {
          const params = new URLSearchParams({ page: String(page) });
          if (club_category_id) {
            params.append('club_category_id', String(club_category_id));
          }
          return {
            url: `admin/clubs?${params.toString()}`,
          };
        },
        providesTags: (result) => (result
          ? [...result.clubs.map((club) => ({ type: 'club' as const, id: club.id })), { type: 'clubs', id: 'LIST' }]
          : [{ type: 'clubs', id: 'LIST' }]),
      }),

    getClub: builder.query<Club, number>({
      query: (id) => ({ url: `admin/clubs/${id}` }),
      providesTags: (result, error, id) => [{ type: 'club', id }],
    }),

    getClubCategoryList: builder.query<ClubCategoryResponse, void>({
      query: () => ({ url: 'admin/clubs/categories' }),
      providesTags: (result) => (result
        ? [
          ...result.club_categories.map((clubCategory) => ({ type: 'club' as const, id: clubCategory.id })), { type: 'clubs', id: 'LIST' }]
        : [{ type: 'clubs', id: 'LIST' }]),
    }),

    addClub: builder.mutation<ClubRequest, Partial<ClubRequest>>({
      query: (body) => ({
        url: 'admin/clubs',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'clubs', id: 'LIST' }],
    }),

    updateClub: builder.mutation<void, Pick<Club, 'id'> & Partial<ClubRequest>>({
      query: ({ id, ...body }) => ({
        url: `admin/clubs/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'club', id }, { type: 'clubs', id: 'LIST' }],
    }),

    toggleClubActive: builder.mutation<void, { id: number, body : { is_active: boolean } }>({
      query: ({ id, body }) => ({
        url: `admin/clubs/${id}/active`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'club', id }, { type: 'clubs', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetClubListQuery, useGetClubQuery, useGetClubCategoryListQuery,
  useAddClubMutation, useUpdateClubMutation, useToggleClubActiveMutation,
} = clubApi;
