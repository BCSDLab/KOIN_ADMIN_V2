export interface SemesterInfo {
  sememsterName: string;
  semesterId: number;
}

export interface CoopshopSemesterData {
  semester: string;
  from_date: string;
  to_date: string;
}

export interface CoopshopSemesterListResponse extends CoopshopSemesterData {
  id: number;
  is_applied: boolean;
}

export interface CoopshopResponse {
  coop_shops: CoopshopInfo[];
}

export interface CoopshopInfo {
  coop_shop_info: CoopshopDetailInfo;
  operation_hours: OperationHour[];
}

export interface CoopshopDetailInfo {
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
