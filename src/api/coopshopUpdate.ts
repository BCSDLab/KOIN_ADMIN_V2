import accessClient from 'api';
import type {
  CoopshopSemesterListResponse, CoopshopSemesterData, CoopshopResponse,
} from 'model/coopshop.model';

export const getCoopshopSemesterList = async () => {
  const response = await accessClient.get<CoopshopSemesterListResponse[]>('admin/coopshop/semesters');
  return response.data;
};

export const postCoopshopSemesterList = async (body:CoopshopSemesterData) => {
  const response = await accessClient.post('admin/coopshop/semesters', body);
  return response.data;
};

export const postCoopshopTimetable = async (body: FormData) => {
  const response = await accessClient.post<CoopshopResponse>(
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

export const putCoopshopTimetable = async (body : CoopshopResponse, id: number) => {
  const response = await accessClient.put(`admin/coopshop/timetable/${id}`, body);
  return response;
};
