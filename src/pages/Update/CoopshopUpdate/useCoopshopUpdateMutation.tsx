import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CoopshopResponse, CoopshopSemesterData } from 'model/coopshop.model';
import coopshopQueries from 'queryFactory/coopshopQueries';
import { postCoopshopSemesterList, postCoopshopTimetable, putCoopshopTimetable } from 'api/coopshopUpdate';

const useCoopshopUpdateMutation = () => {
  const queryClient = useQueryClient();
  const addCoopshopSemester = useMutation({
    mutationFn: (semesterData: CoopshopSemesterData) => postCoopshopSemesterList(semesterData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: coopshopQueries.allkeys(),
      });
    },
  });

  const uploadCoopshopTimetable = useMutation({
    mutationFn: (formData: FormData) => postCoopshopTimetable(formData),
  });

  const migrateCoopshopTimetable = useMutation({
    mutationFn: ({ uploadedData, semesterId }: {
      uploadedData: CoopshopResponse,
      semesterId: number,
    }) => putCoopshopTimetable(uploadedData, semesterId),
  });

  return {
    addCoopshopSemester,
    uploadCoopshopTimetable,
    uploadedData: uploadCoopshopTimetable.data,
    migrateCoopshopTimetable,
  };
};

export default useCoopshopUpdateMutation;
