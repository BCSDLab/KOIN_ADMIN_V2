export type DeliveryRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export type DeliveryOption = 'CAMPUS' | 'OFF_CAMPUS' | 'BOTH';

export type DeliveryRequestProcessType = 'APPROVE' | 'REJECT';

export interface DeliveryRequest {
  id: number;
  shop_id: number;
  shop_name: string;
  request_status: DeliveryRequestStatus;
  created_at: string;
  approved_at?: string;
}

export interface DeliveryRequestsResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  order_service_requests: DeliveryRequest[];
}

export interface DeliveryRequestTableRow {
  id: number;
  shop_id: number;
  shop_name: string;
  request_status: DeliveryRequestStatus;
  created_at: string;
}

export interface DeliveryRequestListResponse {
  requests: DeliveryRequestTableRow[];
  totalPage: number;
}

export interface DeliveryRequestMenuOption {
  name?: string;
  price?: number;
}

export interface DeliveryRequestMenuOptionGroup {
  name?: string;
  description?: string;
  is_required?: boolean;
  min_select?: number;
  max_select?: number;
  options?: DeliveryRequestMenuOption[];
}

export interface DeliveryRequestMenu {
  menu_id?: number;
  name?: string;
  description?: string;
  categories?: { id?: number; name?: string }[];
  prices?: { name?: string; price?: number }[];
  image_urls?: string[];
  option_groups?: DeliveryRequestMenuOptionGroup[];
}

export interface DeliveryRequestDetail {
  id: number;
  shop_id: number;
  shop_name: string;
  minimum_order_amount: number;
  is_takeout: boolean;
  delivery_option: DeliveryOption;
  campus_delivery_tip: number;
  off_campus_delivery_tip?: number;
  request_status: DeliveryRequestStatus;
  business_license_url: string;
  business_certificate_url: string;
  bank_copy_url: string;
  bank: string;
  account_number: string;
  created_at: string;
  approved_at?: string;
  account_holder: string | null;
  menus: DeliveryRequestMenu[] | null;
  rejection_reason: string | null;
}

export interface DeliveryRequestProcessBody {
  process_type: DeliveryRequestProcessType;
  rejection_reason?: string;
}
