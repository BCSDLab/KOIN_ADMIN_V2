import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import {
  RoomResponse, RoomsResponse, RoomTableHead,
} from 'model/room.model';
import { RootState } from 'store';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  tagTypes: ['rooms', 'room'],

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
    getRoomList: builder.query<{ roomList: RoomTableHead[], totalPage: number }, number>({
      query: (page) => ({ url: `admin/lands?page=${page}` }),
      providesTags: (result) => (result
        ? [...result.roomList.map((room) => ({ type: 'room' as const, id: room.id })), { type: 'rooms', id: 'LIST' }]
        : [{ type: 'rooms', id: 'LIST' }]),
      transformResponse: (roomResponse: RoomsResponse) => {
        const tableData = roomResponse.lands?.map(({
          id, name, room_type, monthly_fee, charter_fee,
        }) => ({
          id, name, room_type, monthly_fee, charter_fee,
        }));
        return {
          roomList: tableData,
          totalPage: roomResponse.totalPage,
        };
      },
    }),

    getRoom: builder.query<RoomResponse, number>({
      query: (id) => ({ url: `lands/${id}` }),
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
      invalidatesTags: (result, error, { id }) => [{ type: 'room', id }],
    }),
  }),
});

export const { useGetRoomListQuery, useGetRoomQuery, useUpdateRoomMutation } = roomApi;
