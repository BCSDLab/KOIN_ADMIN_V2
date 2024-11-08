import { OS, AppVersionResponse } from 'model/forceUpdate.model';

export interface UpdateListRequest {
  page: number;
  type: OS;
  limit?: number;
}

export interface UpdateListResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  versions: AppVersionResponse[];
}
