import { FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { useGetNicknameCheckMutation } from 'store/api/user';
import makeToast from 'utils/ts/makeToast';

export default function useNicknameCheck(form: FormInstance) {
  const [nicknameChecked, setNicknameChecked] = useState(true);
  const [checkNickname] = useGetNicknameCheckMutation();

  const changeNickname = () => {
    setNicknameChecked(false);
  };

  const checkDuplicateNickname = () => {
    checkNickname(form.getFieldValue('nickname'))
      .unwrap()
      .then(() => {
        makeToast('success', '사용 가능한 닉네임입니다.');
        setNicknameChecked(true);
      })
      .catch(() => {
        makeToast('error', '이미 존재하는 닉네임입니다.');
        setNicknameChecked(false);
      });
  };

  const nicknameValidator = () => (nicknameChecked ? Promise.resolve() : Promise.reject(new Error('닉네임 중복을 확인해주세요')));

  useEffect(() => {
    form.validateFields(['nickname']);
  }, [nicknameChecked, form]);

  return { changeNickname, checkDuplicateNickname, nicknameValidator };
}
