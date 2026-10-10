export interface Dining {
  id: number;
  date: string;
  type: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  place: 'A코너' | 'B코너' | 'C코너';
}

export interface SoldOutReportProcessor {
  workspace_id: string;
  user_id: string;
  display_name: string;
}

export interface SoldOutReportReporter {
  id: number;
  name: string;
}

export type SoldOutReportStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface SoldOutReportListParams {
  only_pending: boolean;
  page: number;
  limit: number;
}

export interface SoldOutReportSummary {
  report_id: number;
  dining: Dining;
  status: SoldOutReportStatus;
  processing_type: string;
  reason: string | null;
  created_at: string;
  processed_at: string | null;
  processor: SoldOutReportProcessor | null;
}

export interface SoldOutReportListResponse {
  reports: SoldOutReportSummary[];
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
}

export interface SoldOutReportDetail extends SoldOutReportSummary {
  image_url: string | null;
  processing_id: string | null;
  source_report_id: number | null;
  updated_at: string;
  reporter: SoldOutReportReporter;
}
