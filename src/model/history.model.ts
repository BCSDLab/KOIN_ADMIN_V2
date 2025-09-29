export interface HistoryInfo {
  id: number;
  domain_id: number;
  name: string;
  domain_name: string;
  request_method: string;
  request_message: string;
  created_at: string;
}

export interface HistoriesRequest {
  page: number;
  limit?: number;
  requestMethod?: string;
  domainName?: string;
  domainId?: number | null;
}

export interface HistoriesResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  histories: HistoryInfo[];
}
