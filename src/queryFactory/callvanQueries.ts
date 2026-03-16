import { queryOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCallvanList, postCallvanReports } from 'api/callvan';
import type {
  CallvanParam,
  CallvanListResponse,
  TransformedCallvanListResponse,
} from 'model/callvan.model';

const callvanQueries = {
  allKeys: () => ['callvan'],

  callvanListKeys: (param: CallvanParam) => [...callvanQueries.allKeys(), param],
  callvanList: (param: CallvanParam) => queryOptions({
    queryKey: callvanQueries.callvanListKeys(param),
    queryFn: () => getCallvanList(param),
    select: (data: CallvanListResponse): TransformedCallvanListResponse => {
      const reports = data.reports.map((report) => ({
        id: report.report_id,
        report_status: report.report_status,
        name: report.reported_user.name,
        nickname: report.reported_user.nickname,
        reported_at: report.reported_at,
        accumulated_report_count: report.accumulated_report_count,
        accumulated_reports: report.accumulated_reports,
        process_type: report.process_type,
        reasons: report.reasons,
        description: report.description,
        attachment_urls: report.attachment_urls,
      }));
      return { reports, total_page: data.total_page, total_count: data.total_count };
    },
  }),
};

export const useProcessCallvan = (param: CallvanParam) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCallvanReports,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: callvanQueries.callvanListKeys(param) });
    },
  });
};

export default callvanQueries;
