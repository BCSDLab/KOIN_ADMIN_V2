import accessClient from 'api';
import type {
  SoldOutReportDetail, SoldOutReportListParams, SoldOutReportListResponse,
} from 'model/dining.model';

export const getSoldOutReports = async ({ only_pending, page, limit }: SoldOutReportListParams) => {
  const response = await accessClient.get<SoldOutReportListResponse>('admin/dining/soldout-reports', {
    params: {
      only_pending,
      page,
      limit,
    },
  });
  return response.data;
};

export const getSoldOutReportDetail = async (reportId: number) => {
  const response = await accessClient.get<SoldOutReportDetail>(`admin/dining/soldout-reports/${reportId}`);
  return response.data;
};
