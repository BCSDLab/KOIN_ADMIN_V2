import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { RootState } from 'store';
import { API_PATH } from 'constant';
import { RoomResponse, RoomTableHead } from 'model/room.model';

export const roomApi = createApi({
  reducerPath: 'room',
  tagTypes: ['room'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
  }),
  endpoints: (builder) => ({
    // builder.query<리턴 타입, 갱신 인자(여기선 page)>
    getRoomList: builder.query<{ roomList: any, totalPage: number }, number>({
      query: (page) => `/lands/?page=${page}`,
      providesTags: ['room'],

      // transformResponse: callback(A) => { return B }
      // A: query에 담은 url로 요청한 API의 리턴값
      // B: builder.query의 리턴 타입
      transformResponse:
        (roomResponse: RoomResponse): { roomList: RoomTableHead[], totalPage: number } => {
          console.log(roomResponse.lands);
          // 테이블에 보여주고 싶은 값들만 꺼내기
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
