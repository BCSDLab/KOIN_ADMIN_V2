import accessClient from 'api';
import type { CommutingBusRouteInfoResponse, Semester } from 'model/bus.model';

export const postCommutingBusTimetable = async (body : FormData) => {
  const response = await accessClient.post<CommutingBusRouteInfoResponse>(
    'admin/bus/commuting/timetable/excel',
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const putCommutingBusTimetable = async (
  body: CommutingBusRouteInfoResponse,
  semesterType: Semester,
) => {
  const response = await accessClient.put(`admin/bus/commuting/timetable?semester_type=${semesterType}`, body);
  return response.data;
};
