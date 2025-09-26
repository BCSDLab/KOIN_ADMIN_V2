import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Club, ClubCategoryResponse, ClubRequest,
} from 'model/club.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const clubApi = createApi({
  reducerPath: 'clubs',
  tagTypes: ['clubs', 'club'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({

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
  useGetClubCategoryListQuery,
  useAddClubMutation, useUpdateClubMutation, useToggleClubActiveMutation,
} = clubApi;
