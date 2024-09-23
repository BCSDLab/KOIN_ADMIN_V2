import { createApi } from '@reduxjs/toolkit/query/react';
import {
  RoomParams,
  RoomResponse, RoomsResponse, RoomTableHead,
} from 'model/room.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const roomApi = createApi({
  reducerPath: 'room',
  tagTypes: ['rooms', 'room'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getRoomList: builder.query<{ roomList: RoomTableHead[], totalPage: number }, RoomParams>({
      query: ({ page, is_deleted }) => ({ url: `admin/lands?page=${page}&is_deleted=${is_deleted}` }),
      providesTags: (result) => (result
        ? [...result.roomList.map((room) => ({ type: 'room' as const, id: room.id })), { type: 'rooms', id: 'LIST' }]
        : [{ type: 'rooms', id: 'LIST' }]),
      transformResponse: (roomResponse: RoomsResponse) => ({
        roomList: roomResponse.lands,
        totalPage: roomResponse.total_page,
      }),
    }),

    getRoom: builder.query<RoomResponse, number>({
      query: (id) => ({ url: `admin/lands/${id}` }),
      providesTags: (result, error, id) => [{ type: 'room', id }],
    }),

    updateRoom: builder.mutation<void, Pick<RoomResponse, 'id'> & Partial<RoomResponse>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `admin/lands/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'room', id }, { type: 'rooms', id: 'LIST' }],
    }),

    deleteRoom: builder.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `admin/lands/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ((result, error, id) => [{ type: 'room', id }, { type: 'rooms', id: 'LIST' }]),
    }),

    addRoom: builder.mutation<RoomResponse, Partial<RoomResponse>>({
      query: (body) => ({
        url: 'admin/lands',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'rooms', id: 'LIST' }],
    }),

    undeleteRoom: builder.mutation<void, number>({
      query: (id) => {
        return {
          url: `admin/lands/${id}/undelete`,
          method: 'POST',
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'room', id }, { type: 'rooms', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetRoomListQuery, useGetRoomQuery, useUndeleteRoomMutation,
  useUpdateRoomMutation, useDeleteRoomMutation, useAddRoomMutation,
} = roomApi;
