import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CoopShopResponse, CoopShopSemesterData } from 'model/coopShop.model';
import coopShopQueries from 'queryFactory/coopShopQueries';
import { postCoopShopSemesterList, postCoopShopTimetable, putCoopShopTimetable } from 'api/coopShopUpdate';

const useCoopShopUpdateMutation = () => {
  const queryClient = useQueryClient();
  const addCoopShopSemester = useMutation({
    mutationFn: (semesterData: CoopShopSemesterData) => postCoopShopSemesterList(semesterData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: coopShopQueries.allkeys(),
      });
    },
  });

  const uploadCoopShopTimetable = useMutation({
    mutationFn: (formData: FormData) => postCoopShopTimetable(formData),
  });

  const migrateCoopShopTimetable = useMutation({
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
