import accessClient from 'api';
import type { Semester, ShuttleBusRouteInfoResponse } from 'model/bus.model';

export const postShuttleBusTimetable = async (body : FormData) => {
  const response = await accessClient.post<ShuttleBusRouteInfoResponse>(
    'admin/bus/shuttle/timetable/excel',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const putShuttleBusTimetable = async (
  semesterType: Semester,
  body: ShuttleBusRouteInfoResponse,
) => {
  const response = await accessClient.put(`admin/bus/shuttle/timetable?semester_type=${semesterType}`, body);
  return response.data;
};
