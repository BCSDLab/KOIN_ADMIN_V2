export type SoldOutReportStatus = 'PENDING' | 'CONFIRMED';
export type SoldOutProcessType = 'APPROVE' | 'REJECT';

export interface SoldOutReport {
  id: number;
  report_status: SoldOutReportStatus;
  sold_out_course: string;
  reported_at: string;
  processor: string | null;
  processed_at: string | null;
  reporter: string;
  image_urls: string[] | null;
  process_type: SoldOutProcessType | null;
}
