import type {
  RoomParams,
  RoomResponse, RoomsResponse, RoomTableHead,
} from 'model/room.model';
import accessClient from './index';

export const getRoomList = async (params: RoomParams):
Promise<{ roomList: RoomTableHead[]; totalPage: number }> => {
  const res = await accessClient.get<RoomsResponse>('admin/lands', { params });
  return {
    roomList: res.data.lands,
    totalPage: res.data.total_page,
  };
};

export const getRoom = async (id: number): Promise<RoomResponse> => {
  const res = await accessClient.get<RoomResponse>(`admin/lands/${id}`);
  return res.data;
};

export const addRoom = async (body: Partial<RoomResponse>): Promise<RoomResponse> => {
  const res = await accessClient.post<RoomResponse>('admin/lands', body);
  return res.data;
};

export const updateRoom = async (
  payload: Pick<RoomResponse, 'id'> & Partial<RoomResponse>,
): Promise<void> => {
  const { id, ...body } = payload;
  await accessClient.put<void>(`admin/lands/${id}`, body);
};

export const deleteRoom = async (
  id: number,
): Promise<{ success: boolean; id: number }> => {
  const res = await accessClient.delete<{ success: boolean; id: number }>(`admin/lands/${id}`);
  return res.data;
};

export const undeleteRoom = async (id: number): Promise<void> => {
  await accessClient.post<void>(`admin/lands/${id}/undelete`);
};
