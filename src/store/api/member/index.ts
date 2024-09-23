import { createApi } from '@reduxjs/toolkit/query/react';
import {
  MemberTableHead, MembersParam, MembersResponse, Member,
} from 'model/member.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const memberApi = createApi({
  reducerPath: 'member',
  tagTypes: ['members', 'member'],
  baseQuery: baseQueryReauth,
  endpoints: (builder) => ({
    getMemberList: builder.query<{
      memberList: MemberTableHead[],
      totalPage: number
    }, MembersParam>({
      query: ({ page, track, is_deleted }) => `admin/members?page=${page}&track=${track}&limit=50&is_deleted=${is_deleted}`,
      providesTags: (result) => (result
        ? [...result.memberList.map((member) => ({ type: 'member' as const, id: member.id })), { type: 'members', id: 'LIST' }]
        : [{ type: 'members', id: 'LIST' }]),
      transformResponse: (membersResponse: MembersResponse) => ({
        memberList: membersResponse.members,
        totalPage: membersResponse.total_page,
      }),
    }),

    getMember: builder.query<Member, number>({
      query: (id) => `admin/members/${id}`,
      providesTags: (result, error, id) => [{ type: 'member', id }],
    }),

    updateMember: builder.mutation<void, Pick<Member, 'id'> & Partial<Member>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/members/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'member', id }, { type: 'members', id: 'LIST' }],
    }),

    deleteMember: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/members/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ((result, error, id) => [
        { type: 'member', id }, { type: 'members', id: 'LIST' },
      ]),
    }),

    addMember: builder.mutation<Member, Partial<Member>>({
      query: (body) => ({
        url: 'admin/members',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'members', id: 'LIST' }],
    }),

    undeleteMember: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `admin/members/${id}/undelete`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'member', id }, { type: 'members', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetMemberListQuery, useGetMemberQuery, useUndeleteMemberMutation,
  useUpdateMemberMutation, useDeleteMemberMutation, useAddMemberMutation,
} = memberApi;
