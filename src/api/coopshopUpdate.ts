import accessClient from 'api';
import type {
  CoopShopSemesterListResponse, CoopShopSemesterData, CoopShopResponse,
} from 'model/coopShop.model';

export const getCoopShopSemesterList = async () => {
  const response = await accessClient.get<CoopShopSemesterListResponse[]>('admin/coopshop/semesters');
  return response.data;
};

export const postCoopShopSemesterList = async (body:CoopShopSemesterData) => {
  const response = await accessClient.post('admin/coopshop/semesters', body);
  return response.data;
};

export const postCoopShopTimetable = async (body: FormData) => {
  const response = await accessClient.post<CoopShopResponse>(
    'admin/coopshop/timetable/excel',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const putCoopShopTimetable = async (body : CoopShopResponse, id: number) => {
  const response = await accessClient.put(`admin/coopshop/timetable/${id}`, body);
  return response;
};
