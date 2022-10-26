export interface RoomDetail {
  id: number;
  name: string;
  monthly_fee: number | string;
  charter_fee: number;
  latitude: number;
  longitude: number;
  // detail data 추가
}

export interface RoomTableHead {
  id: number;
  name: string;
  monthly_fee: number | string;
  charter_fee: number;
  latitude: number;
  longitude: number;
}

export interface RoomResponse {
  totalPage: number;
  lands: RoomDetail[];
}
