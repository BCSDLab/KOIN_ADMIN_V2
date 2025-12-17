import type { UpdateListRequest, UpdateListResponse } from 'model/updateList.model';
import accessClient from './index';

const getUpdateList = async (params: UpdateListRequest):Promise<UpdateListResponse> => {
  const { page, type, limit = 10 } = params;
  const res = await accessClient.get<UpdateListResponse>(`admin/version/history/${type}`, { params: { page, limit } });
  return res.data;
};

export default getUpdateList;
