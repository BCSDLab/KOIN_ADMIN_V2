import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import {
  RoomResponse, RoomsResponse, RoomTableHead,
} from 'model/room.model';
import { RootState } from 'store';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  tagTypes: ['room'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      // 토큰이 필요한 조회에는 헤더를 추가할 필요가 있음.
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRoomList: builder.query<{ roomList: RoomTableHead[] }, number>({
      // TODO: admin get api로 변경. (페이지네이션 추가 수정)
      query: () => ({ url: 'lands' }),
      providesTags: (result) => (result
        ? [
          ...result.roomList.map(({ id }) => ({ type: 'room', id } as const)),
          { type: 'room', id: 'LIST' },
        ]
        : [{ type: 'room', id: 'LIST' }]),

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
            // totalPage: Math.ceil(roomResponse.lands.length / 10),
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
