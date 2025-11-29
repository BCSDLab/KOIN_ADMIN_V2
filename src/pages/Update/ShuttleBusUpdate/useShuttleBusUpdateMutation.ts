import { useMutation } from '@tanstack/react-query';
import type { ShuttleBusRouteInfoResponse, Semester } from 'model/bus.model';
import { postShuttleBusTimetable, putShuttleBusTimetable } from 'api/shuttleBusUpdate';
import { AxiosError } from 'axios';

const useShuttleBusUpdateMutation = () => {
  const uploadShuttleBusTimetable = useMutation<
  ShuttleBusRouteInfoResponse,
  AxiosError<{ message?: string }>,
  FormData>({
    mutationFn: (formData: FormData) => postShuttleBusTimetable(formData),
  });

  const migrateShuttleBusTimetable = useMutation<
  void,
  AxiosError<{ message?: string }>,
  {
    semesterType: Semester;
    uploadedData: ShuttleBusRouteInfoResponse;
  }
  >({
    mutationFn: ({ semesterType, uploadedData }: {
      semesterType: Semester,
      uploadedData: ShuttleBusRouteInfoResponse,
    }) => putShuttleBusTimetable(semesterType, uploadedData),
  });

  return {
    uploadShuttleBusTimetable,
    uploadedData: uploadShuttleBusTimetable.data,
    migrateShuttleBusTimetable,
  };
};

export default useShuttleBusUpdateMutation;
