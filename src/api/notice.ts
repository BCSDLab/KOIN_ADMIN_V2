import accessClient from 'api';
import {
  NoticeRequest, NoticesParam, NoticesResponse, NoticeResponse, DeleteNoticeResponse,
} from 'model/notice.model';

export const getNoticeList = async ({ page, is_deleted } : NoticesParam) => {
  const response = await accessClient.get<NoticesResponse>(`admin/notice?page=${page}&is_deleted=${is_deleted}`);
  return response.data;
};

export const getNotice = async (id : number) => {
  const response = await accessClient.get<NoticeResponse>(`admin/notice/${id}`);
  return response.data;
};

export const addNotice = async (body: Partial<NoticeRequest>) => {
  const response = await accessClient.post<NoticeRequest>('admin/notice', body);
  return response;
};

export const updateNotice = async (data: Pick<NoticeResponse, 'id'> & Partial<NoticeRequest>) => {
  const { id, ...body } = data;
  const response = await accessClient.put<NoticeRequest>(`admin/notice/${id}`, body);
  return response;
};

export const deleteNotice = async (id: number) => {
  const response = await accessClient.delete<DeleteNoticeResponse>(`admin/notice/${id}`);
  return response;
};
