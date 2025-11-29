import { useMutation } from '@tanstack/react-query';
import type { CommutingBusRouteInfoResponse, Semester } from 'model/bus.model';
import { postCommutingBusTimetable, putCommutingBusTimetable } from 'api/commutingBusUpdate';
import { AxiosError } from 'axios';

const useCommutingBusUpdateMutation = () => {
  const uploadCommutingBusTimetable = useMutation<
  CommutingBusRouteInfoResponse,
  AxiosError<{ message?: string }>,
  FormData>({
    mutationFn: (formData: FormData) => postCommutingBusTimetable(formData),
  });

  const migrateCommutingBusTimetable = useMutation<
  void,
  AxiosError<{ message?: string }>,
  {
    uploadedData: CommutingBusRouteInfoResponse;
    semesterType: Semester;
  }>({
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
