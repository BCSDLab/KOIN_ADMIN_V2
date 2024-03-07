import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUpdateOwnerRequestMutation, useDeleteOwnerRequestMutation } from 'store/api/ownerRequest';

export default function useOwnerRequestMutation(id: number) {
  const [updateOwnerMutation] = useUpdateOwnerRequestMutation();
  const [deleteOwnerMutation] = useDeleteOwnerRequestMutation();
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

  const deleteOwnerRequest = () => {
    deleteOwnerMutation(id)
      .unwrap()
      .then(() => {
        message.success('삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  };

  return { updateOwnerRequest, deleteOwnerRequest };
}
