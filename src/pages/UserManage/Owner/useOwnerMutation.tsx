import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { OwnerResponse } from 'model/owner.model';
import { ownerQueries } from 'queryFactory/ownerQueries';
import { useNavigate } from 'react-router-dom';
import { updateOwner } from 'api/owner';

export default function useOwnerMutation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateOwnerMutation = useMutation({
    mutationFn: (formData: Partial<OwnerResponse>) => updateOwner({ id, ...formData }),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: ownerQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return { updateOwnerMutation };
}
