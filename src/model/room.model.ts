export interface RoomDetail {
  id: number;
  name: string;
  room_type: string;
  monthly_fee: number | string;
  charter_fee: number | null;
  // detail data 추가
}

export interface RoomTableHead {
  id: number;
  name: string;
  room_type: string;
  monthly_fee: number | string;
  charter_fee: number | null;
}

export interface RoomResponse {
  totalPage: number;
  lands: RoomDetail[];
}
