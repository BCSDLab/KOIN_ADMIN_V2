import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CoopShopResponse, CoopShopSemesterData } from 'model/coopShop.model';
import coopShopQueries from 'queryFactory/coopShopQueries';
import { postCoopShopSemesterList, postCoopShopTimetable, putCoopShopTimetable } from 'api/coopShopUpdate';
import { AxiosError } from 'axios';

const useCoopShopUpdateMutation = () => {
  const queryClient = useQueryClient();
  const addCoopShopSemester = useMutation<
  void,
  AxiosError<{ message?: string }>,
  CoopShopSemesterData
  >({
    mutationFn: (semesterData: CoopShopSemesterData) => postCoopShopSemesterList(semesterData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: coopShopQueries.allkeys(),
      });
    },
  });

  const uploadCoopShopTimetable = useMutation<
  CoopShopResponse,
  AxiosError<{ message?: string }>,
  FormData
  >({
    mutationFn: (formData: FormData) => postCoopShopTimetable(formData),
  });

  const migrateCoopShopTimetable = useMutation<
  void,
  AxiosError<{ message?: string }>,
  {
    uploadedData: CoopShopResponse;
    semesterId: number;
  }
  >({
    mutationFn: ({ uploadedData, semesterId }: {
      uploadedData: CoopShopResponse;
      semesterId: number;
    }) => putCoopShopTimetable(uploadedData, semesterId),
  });

  return {
    addCoopShopSemester,
    uploadCoopShopTimetable,
    uploadedData: uploadCoopShopTimetable.data,
    migrateCoopShopTimetable,
  };
};

export default useCoopShopUpdateMutation;
