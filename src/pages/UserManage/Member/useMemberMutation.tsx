import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  updateMember, deleteMember, addMember, undeleteMember,
} from 'api/member';
import type { Member } from 'model/member.model';
import memberQueries from 'queryFactory/memberQueries';
import { useNavigate } from 'react-router-dom';

export default function useMemberMutation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const updateMemberMutation = useMutation({
    mutationFn: (formData: Partial<Member>) => updateMember(formData),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: memberQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: () => deleteMember(id),
    onSuccess: () => {
      message.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: memberQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: (formData: Partial<Member>) => addMember(formData),
    onSuccess: () => {
      message.success('추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: memberQueries.allKeys() });
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const undeleteMemberMutation = useMutation({
    mutationFn: () => undeleteMember(id),
    onSuccess: () => {
      message.success('복구되었습니다.');
      queryClient.invalidateQueries({ queryKey: memberQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return {
    updateMemberMutation, deleteMemberMutation, addMemberMutation, undeleteMemberMutation,
  };
}
