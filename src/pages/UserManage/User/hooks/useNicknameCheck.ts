import { FormInstance, message } from 'antd';
import { useEffect, useState } from 'react';
import { useGetNicknameCheckMutation } from 'store/api/user';

export default function useNicknameCheck(form: FormInstance) {
  const [nicknameChecked, setNicknameChecked] = useState(true);
  const [checkNickname] = useGetNicknameCheckMutation();

  const handleNicknameChange = () => {
    setNicknameChecked(false);
  };

  const checkDuplicateNickname = () => {
    checkNickname(form.getFieldValue('nickname'))
      .unwrap()
      .then(() => {
        message.success('사용 가능한 닉네임입니다.');
        setNicknameChecked(true);
      })
      .catch(({ data }) => {
        message.error(data.error.message);
        setNicknameChecked(false);
      });
  };

  const validator = () => (nicknameChecked ? Promise.resolve() : Promise.reject(new Error('닉네임 중복을 확인해주세요')));

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [nicknameChecked, form]);

  return { handleNicknameChange, checkDuplicateNickname, validator };
}
