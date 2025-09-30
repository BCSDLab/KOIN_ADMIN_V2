import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import type { UserDetail } from 'model/user.model';
import { useNavigate } from 'react-router-dom';
import filterObject from 'utils/ts/filterObject';
import userQueries from 'queryFactory/userQueries';
import { updateUser } from 'api/user';

export default function useUserMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: (formData: UserDetail) => updateUser(filterObject(
      formData,
      ['id', 'email', 'gender', 'major', 'name', 'nickname', 'phone_number', 'student_number'],
    )),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: userQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '정보 수정에 실패했습니다.');
    },

  });

  return { updateUserMutation };
}
