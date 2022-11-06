import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from 'constant';
import { RoomDetail, RoomResponse, RoomTableHead } from 'model/room.model';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  tagTypes: ['room'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
  }),
  endpoints: (builder) => ({
    getRoomList: builder.query<{
      roomList: RoomTableHead[], totalPage: number, map?: any
    }, number>({
      // TODO: admin get api로 변경. (페이지네이션 추가 수정)
      query: (page) => ({ url: `lands/?page=${page}` }),
      providesTags: (result) => (result
        ? [
          ...result.roomList.map(({ id }: any) => ({ type: 'room', id } as const)),
          { type: 'room', id: 'LIST' },
        ]
        : [{ type: 'room', id: 'LIST' }]),

      transformResponse:
        (roomResponse: RoomResponse):
        { roomList: RoomTableHead[], totalPage: number } => {
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

    getRoom: builder.query<RoomDetail, number>({
      query: (id) => ({ url: `lands/${id}` }),
      providesTags: (result, error, id) => [{ type: 'room', id }],
    }),

    updateRoom: builder.mutation<void, Pick<RoomDetail, 'id'> & Partial<RoomDetail>>({
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
