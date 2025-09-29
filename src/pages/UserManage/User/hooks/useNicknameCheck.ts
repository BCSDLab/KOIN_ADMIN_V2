import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormInstance, message } from 'antd';
import { getNicknameCheck } from 'api/user';
import userQueries from 'queryFactory/userQueries';
import { useEffect, useState } from 'react';

export default function useNicknameCheck(form: FormInstance) {
  const [nicknameChecked, setNicknameChecked] = useState(true);
  const queryClient = useQueryClient();

  const handleNicknameChange = () => {
    setNicknameChecked(false);
  };

  const checkDuplicateNicknameMutation = useMutation({
    mutationFn: () => getNicknameCheck(form.getFieldValue('nickname')),
    onSuccess: () => {
      message.success('사용 가능한 닉네임입니다.');
      queryClient.invalidateQueries({ queryKey: userQueries.allKeys() });
      setNicknameChecked(true);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
      setNicknameChecked(false);
    },
  });

  const validator = () => (nicknameChecked ? Promise.resolve() : Promise.reject(new Error('닉네임 중복을 확인해주세요')));

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [nicknameChecked, form]);

  return { handleNicknameChange, checkDuplicateNicknameMutation, validator };
}
