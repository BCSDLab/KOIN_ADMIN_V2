import accessClient from 'api';
import type { CallvanParam, CallvanListResponse, CallvanBanRequest } from 'model/callvan.model';

export const getCallvanList = async ({ only_pending, page, limit }: CallvanParam) => {
  const response = await accessClient.get<CallvanListResponse>('admin/callvan/reports', {
    params: {
      only_pending,
      page,
      limit,
    },
  });
  return response.data;
};

export const postCallvanReports = async ({ reportId, process_type }: CallvanBanRequest) => {
  const response = await accessClient.post(`admin/callvan/reports/${reportId}/process`, { process_type });
  return response;
};
