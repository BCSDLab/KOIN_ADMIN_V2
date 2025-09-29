import { message } from 'antd';
import { OwnerResponse } from 'model/owner.model';
import { useNavigate } from 'react-router-dom';
import { useUpdateOwnerMutation } from 'store/api/owner';

export default function useOwnerMutation(id: number) {
  const [updateOwnerMutation] = useUpdateOwnerMutation();
  const navigate = useNavigate();

  const updateOwner = (formData: Partial<OwnerResponse>) => {
    updateOwnerMutation({ id, ...formData })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  };

  return { updateOwner };
}
