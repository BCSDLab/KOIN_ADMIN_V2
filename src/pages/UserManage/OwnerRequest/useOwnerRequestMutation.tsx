import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUpdateOwnerRequestMutation } from 'store/api/ownerRequest';

export default function useOwnerRequestMutation(id: number) {
  const [updateOwnerMutation] = useUpdateOwnerRequestMutation();
  const navigate = useNavigate();

  const updateOwnerRequest = () => {
    updateOwnerMutation(id)
      .unwrap()
      .then(() => {
        message.success('사장님 승인이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  };

  return { updateOwnerRequest };
}
