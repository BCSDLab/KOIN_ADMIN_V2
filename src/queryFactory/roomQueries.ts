import { queryOptions, skipToken } from '@tanstack/react-query';
import type {
  RoomParams, RoomsResponse, TransformedRoomsResponse,
} from 'model/room.model';
import {
  getRoomList,
  getRoom,
} from 'api/room';

const roomQueries = {
  allKeys: () => ['room'],

  listKeys: (params:RoomParams) => [...roomQueries.allKeys(), 'list', { params }],
  list: (params:RoomParams) => queryOptions({
    queryKey: roomQueries.listKeys(params),
    queryFn: () => getRoomList(params),
    select: (data:RoomsResponse):TransformedRoomsResponse => {
      return {
        roomList: data.lands,
        totalPage: data.total_page,
      };
    },

  }),

  detailKeys: (id:number) => [...roomQueries.allKeys(), 'detail', id],
  detail: (id?:number) => queryOptions({
    queryKey: id != null ? roomQueries.detailKeys(id) : ['room', 'detail', 'NO_ID'],
    queryFn: id != null ? () => getRoom(id) : skipToken,
  }),

};

export default roomQueries;
