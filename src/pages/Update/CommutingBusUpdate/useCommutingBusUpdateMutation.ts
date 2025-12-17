import { useMutation } from '@tanstack/react-query';
import type { CommutingBusRouteInfoResponse, Semester } from 'model/bus.model';
import { postCommutingBusTimetable, putCommutingBusTimetable } from 'api/commutingBusUpdate';

const useCommutingBusUpdateMutation = () => {
  const uploadCommutingBusTimetable = useMutation({
    mutationFn: (formData: FormData) => postCommutingBusTimetable(formData),
  });

  const migrateCommutingBusTimetable = useMutation({
    mutationFn: ({ uploadedData, semesterType }: {
      uploadedData: CommutingBusRouteInfoResponse;
      semesterType: Semester;
    }) => putCommutingBusTimetable(uploadedData, semesterType),
  });

  return {
    uploadCommutingBusTimetable,
    uploadedData: uploadCommutingBusTimetable.data,
    migrateCommutingBusTimetable,
  };
};

export default useCommutingBusUpdateMutation;
