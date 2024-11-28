interface HistoryInfo {
  id: number;
  domain_id: number;
  name: string;
  domain_name: string;
  request_method: string;
  request_message: string;
  created_at: string;
}

export interface HistorysRequest {
  page: number;
  limit?: number;
  requestMethod?: string;
  domainName?: string;
  domainId?: number;
}

export interface HistorysResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  historys: HistoryInfo[];
}
