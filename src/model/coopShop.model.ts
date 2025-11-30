export interface SemesterInfo {
  sememsterName: string;
  semesterId: number;
}

export interface CoopShopSemesterData {
  semester: string;
  from_date: string;
  to_date: string;
}

export interface CoopShopSemesterListResponse extends CoopShopSemesterData {
  id: number;
  is_applied: boolean;
}

export interface CoopShopResponse {
  coop_shops: CoopShopInfo[];
}

export interface CoopShopInfo {
  coop_shop_info: CoopShopDetailInfo;
  operation_hours: OperationHour[];
}

export interface CoopShopDetailInfo {
  name: string;
  phone: string;
  location: string;
  remark: string | null;
}

export interface OperationHour {
  type: string | null;
  day_of_week: string;
  open_time: string;
  close_time: string;
}
