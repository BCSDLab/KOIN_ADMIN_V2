import { useMutation } from '@tanstack/react-query';
import type { ShuttleBusRouteInfoResponse, Semester } from 'model/bus.model';
import { postShuttleBusTimetable, putShuttleBusTimetable } from 'api/shuttleBusUpdate';

const useShuttleBusUpdateMutation = () => {
  const uploadShuttleBusTimetable = useMutation({
    mutationFn: (formData: FormData) => postShuttleBusTimetable(formData),
  });

  const migrateShuttleBusTimetable = useMutation({
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
