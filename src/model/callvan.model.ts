export interface CallvanParam {
  page: number;
  limit: number;
  only_pending: boolean;
}

export interface CallvanReportReason {
  reason_code: string;
  custom_text: string;
}

export interface CallvanAccumulatedReport {
  report_id: number;
  reported_at: string;
  report_status: string;
  process_type: string;
  restricted_until: string;
  reasons: CallvanReportReason[];
}

export interface CallvanReportUser {
  id: number;
  name: string;
  nickname: string;
}
export interface CallvanReport {
  report_id: number;
  report_status: string;
  reported_user: CallvanReportUser;
  reported_at: string;
  reasons: CallvanReportReason[];
  process_type: string;
  restricted_until: string;
  description: string;
  attachment_urls: string[];
  accumulated_report_count: number;
  accumulated_reports: CallvanAccumulatedReport[];
}

export interface CallvanListResponse {
  reports: CallvanReport[];
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
}

export interface TransformedCallvanReport {
  id: number;
  report_status: string;
  name: string;
  nickname: string;
  reported_at: string;
  accumulated_report_count: number;
  accumulated_reports: CallvanAccumulatedReport[];
  process_type: string;
  reasons: CallvanReportReason[];
  description: string;
  attachment_urls: string[];
}

export interface TransformedCallvanListResponse {
  reports: TransformedCallvanReport[];
  total_page: number;
  total_count: number;
}

export interface CallvanBanRequest {
  reportId: number;
  process_type: string;
}
