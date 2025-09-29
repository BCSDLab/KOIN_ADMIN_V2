import accessClient from 'api';
import { HistoriesRequest, HistoriesResponse } from 'model/history.model';

const getHistories = async ({ page, domainId = null, limit = 30 } :HistoriesRequest) => {
  const response = await accessClient.get<HistoriesResponse>(`admin/histories?page=${page}&limit=${limit}${domainId ? `&domainId=${domainId}` : ''}`);
  return response.data;
};

export default getHistories;
