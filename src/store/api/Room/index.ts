import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { RoomResponse, RoomTableHead } from 'model/room.model';

export const roomApi = createApi({
  reducerPath: 'room',
  tagTypes: ['room'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
  }),
  endpoints: (builder) => ({
    getRoomList: builder.query<{ roomList: RoomTableHead[], totalPage: number }, number>({
      // TODO: admin get api로 변경. (페이지네이션 추가 수정)
      query: (page) => `lands/?page=${page}`,
      providesTags: ['room'],

      transformResponse:
        (roomResponse: RoomResponse): { roomList: RoomTableHead[], totalPage: number } => {
          console.log(roomResponse);
          const tableData = roomResponse.lands?.map(({
            id, name, room_type, monthly_fee, charter_fee,
          }) => ({
            id, name, room_type, monthly_fee, charter_fee,
          }));
          return {
            roomList: tableData,
            totalPage: Math.ceil(roomResponse.lands.length / 10),
          };
        },
    }),
  }),
});

export const { useGetRoomListQuery } = roomApi;
