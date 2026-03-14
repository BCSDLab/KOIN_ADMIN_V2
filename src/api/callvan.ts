import accessClient from 'api';
import type { CallvanParam, CallvanListResponse } from 'model/callvan.model';

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

export default getCallvanList;
