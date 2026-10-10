import { queryOptions } from '@tanstack/react-query';
import { getSoldOutReportDetail, getSoldOutReports } from 'api/dining';
import type { SoldOutReportListParams } from 'model/dining.model';

const diningQueries = {
  allKeys: () => ['dining'],

  soldOutReportListKeys: (params: SoldOutReportListParams) => [
    ...diningQueries.allKeys(), 'soldout-reports', params,
  ],
  soldOutReportList: (params: SoldOutReportListParams) => queryOptions({
    queryKey: diningQueries.soldOutReportListKeys(params),
    queryFn: () => getSoldOutReports(params),
  }),

  soldOutReportDetailKeys: (reportId: number) => [
    ...diningQueries.allKeys(), 'soldout-reports', reportId,
  ],
  soldOutReportDetail: (reportId: number) => queryOptions({
    queryKey: diningQueries.soldOutReportDetailKeys(reportId),
    queryFn: () => getSoldOutReportDetail(reportId),
  }),
};

export default diningQueries;
