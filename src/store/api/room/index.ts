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
    getRoomList: builder.query<{ roomList: RoomTableHead[] }, number>({
      // TODO: admin get api로 변경. (페이지 네이션이 추가되면 그에 맞춰 메인 캐싱도 변경)
      query: () => ({ url: 'lands' }),
      providesTags: [{ type: 'rooms', id: 'LIST' }],

      transformResponse:
        (roomResponse: RoomsResponse):
        { roomList: RoomTableHead[] } => {
          const tableData = roomResponse.lands?.map(({
            id, name, room_type, monthly_fee, charter_fee,
          }) => ({
            id, name, room_type, monthly_fee, charter_fee,
          }));
          return {
            roomList: tableData,
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

  }),
});

export const {
  useGetRoomListQuery, useGetRoomQuery,
  useUpdateRoomMutation, useDeleteRoomMutation, useAddRoomMutation,
} = roomApi;
