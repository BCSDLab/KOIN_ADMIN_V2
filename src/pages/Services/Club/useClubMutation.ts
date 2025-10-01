import { message } from 'antd';
import { ClubRequest, ClubUpdateRequest } from 'model/club.model';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postClub, putClub, toggleClub } from 'api/club';
import clubQueries from 'queryFactory/clubQueries';

export default function useClubMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addClubMutation = useMutation({
    mutationFn: (formData: Partial<ClubRequest>) => postClub(formData),
    onSuccess: () => {
      message.success('동아리 추가가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: clubQueries.allKey() });
      navigate(-1);
    },
    onError: (error: any) => {
      message.error(error?.message ?? '동아리 추가 실패');
    },
  });

  const updateClubMutation = useMutation({
    mutationFn: (formData: ClubUpdateRequest) => putClub(formData),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: clubQueries.allKey() });
    },
    onError: (error: any) => {
      message.error(error?.message ?? '정보 수정 실패');
    },
  });

  const toggleClubActiveMutation = useMutation({
    mutationFn: (
      { id, active }: { id: number; active: boolean },
    ) => toggleClub({ id, body: { is_active: active } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clubQueries.allKey() });
    },
    onError: (error: any) => {
      message.error(error?.message ?? '상태 변경 실패');
    },
  });

  return { addClubMutation, updateClubMutation, toggleClubActiveMutation };
}
