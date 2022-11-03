export interface RoomDetail {
  address: string;
  charter_fee: string | number;
  deposit: string | number;
  description: string;
  floor: string | number;
  id: number;
  image_urls: any;
  latitude: number;
  longitude: number;
  management_fee: string | number;
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
  lands: RoomTableHead[];
}
