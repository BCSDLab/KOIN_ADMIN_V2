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
    getRoomList: builder.query<{ roomList: any, totalPage: number }, number>({
      query: (page) => `/lands/?page=${page}`,
      providesTags: ['room'],

      transformResponse:
        (roomResponse: RoomResponse): { roomList: RoomTableHead[], totalPage: number } => {
          const tableData = roomResponse.lands?.map(({
            id, name, monthly_fee, charter_fee, latitude, longitude,
          }) => ({
            id, name, monthly_fee, charter_fee, latitude, longitude,
          }));

          return {
            roomList: tableData,
            totalPage: roomResponse.totalPage,
          };
        },
    }),
  }),
});

export const { useGetRoomListQuery } = roomApi;
