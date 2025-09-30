import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import ownerRequestQueries from 'queryFactory/ownerRequestQueries';
import { useNavigate } from 'react-router-dom';
import { updateOwnerRequest } from 'api/ownerRequest';

export default function useOwnerRequestMutation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateOwnerRequestMutation = useMutation({
    mutationFn: () => updateOwnerRequest(id),
    onSuccess: () => {
      message.success('사장님 승인이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ownerRequestQueries.allkeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return { updateOwnerRequestMutation };
}
