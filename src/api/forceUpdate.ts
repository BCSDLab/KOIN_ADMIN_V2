import accessClient from 'api';
import type { AppVersionResponse, OS, UpdateAppVersionRequest } from 'model/forceUpdate.model';

export const getAppVersion = async (type: OS): Promise<AppVersionResponse> => {
  const res = await accessClient.get<AppVersionResponse>(`/admin/version/${type}`);
  return res.data;
};

export const updateAppVersion = async (data: UpdateAppVersionRequest): Promise<void> => {
  const { type, ...body } = data;
  await accessClient.post(`/admin/version/${type}`, body);
};
