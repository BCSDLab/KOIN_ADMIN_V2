import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUpdateOwnerMutation, useDeleteOwnerMutation } from 'store/api/ownerRequest';

export default function useOwnerMutation(id: number) {
  const [updateOwnerMutation] = useUpdateOwnerMutation();
  const [deleteOwnerMutation] = useDeleteOwnerMutation();
  const navigate = useNavigate();

  const updateOwner = () => {
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

  const deleteOwner = () => {
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

  return { updateOwner, deleteOwner };
}
