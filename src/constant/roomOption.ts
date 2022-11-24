const ROOM_INPUT = [
  'name',
  'room_type',
  'management_fee',
  'size',
  'monthly_fee',
  'charter_fee',
  'latitude',
  'longitude',
  'deposit',
  'floor',
  'phone',
  'address',
  'description',
  'opt_refrigerator',
  'opt_closet',
  'opt_tv',
  'opt_microwave',
  'opt_gas_range',
  'opt_induction',
  'opt_water_purifier',
  'opt_air_conditioner',
  'opt_washer',
  'opt_bed',
  'opt_desk',
  'opt_shoe_closet',
  'opt_electronic_door_locks',
  'opt_bidet',
  'opt_veranda',
  'opt_elevator',
] as const;

const ROOM_OPTION = [
  {
    name: '냉장고',
    data: 'opt_refrigerator',
  },
  {
    name: '옷장',
    data: 'opt_closet',
  },
  {
    name: 'TV',
    data: 'opt_tv',
  },
  {
    name: '전자레인지',
    data: 'opt_microwave',
  },
  {
    name: '가스레인지',
    data: 'opt_gas_range',
  },
  {
    name: '인덕션',
    data: 'opt_induction',
  },
  {
    name: '정수기',
    data: 'opt_water_purifier',
  },
  {
    name: '에어컨',
    data: 'opt_air_conditioner',
  },
  {
    name: '세탁기',
    data: 'opt_washer',
  },
  {
    name: '침대',
    data: 'opt_bed',
  },
  {
    name: '책상',
    data: 'opt_desk',
  },
  {
    name: '신발장',
    data: 'opt_shoe_closet',
  },
  {
    name: '도어락',
    data: 'opt_electronic_door_locks',
  },
  {
    name: '비데',
    data: 'opt_bidet',
  },
  {
    name: '베란다',
    data: 'opt_veranda',
  },
  {
    name: '엘레베이터',
    data: 'opt_elevator',
  },
] as const;

export interface RoomOptionValue {
  name: string;
  data: string;
}

export { ROOM_OPTION, ROOM_INPUT };
