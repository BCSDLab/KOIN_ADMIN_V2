import { ListPagination } from './common.model';

export interface RoomResponse {
  address: string;
  charter_fee: string;
  deposit: string;
  description: string;
  floor: number;
  id: number;
  image_urls: string[];
  latitude: number;
  longitude: number;
  management_fee: string;
  monthly_fee: string;
  name: string;
  opt_air_conditioner: boolean;
  opt_bed: boolean;
  opt_bidet: boolean;
  opt_closet: boolean;
  opt_desk: boolean;
  opt_electronic_door_locks: boolean;
  opt_elevator: boolean;
  opt_gas_range: boolean;
  opt_induction: boolean;
  opt_microwave: boolean;
  opt_refrigerator: boolean;
  opt_shoe_closet: boolean;
  opt_tv: boolean;
  opt_veranda: boolean;
  opt_washer: boolean;
  opt_water_purifier: boolean;
  phone: string | number;
  room_type: string;
  size: number;
  is_deleted: boolean;
}

export interface RoomTableHead {
  id: number;
  name: string;
  room_type: string;
  monthly_fee: number | string;
  charter_fee: number | null;
}

export interface RoomsResponse extends ListPagination {
  lands: RoomTableHead[];
}

export interface FileList {
  uid: string;
  name: string;
  status: string;
  url: string;
}

export interface RoomParams {
  page: number,
  is_deleted: boolean,
}

export interface TransformedRoomsResponse {
  roomList: RoomTableHead[];
  totalPage: number;
}
