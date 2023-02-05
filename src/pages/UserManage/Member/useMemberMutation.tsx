import { message } from 'antd';
import { Member } from 'model/member.model';
import { useNavigate } from 'react-router-dom';
import { useDeleteMemberMutation, useUpdateMemberMutation } from 'store/api/member';

export default function useMemberMutation(id: number) {
  const [updateMemberMutation] = useUpdateMemberMutation();
  const [deleteMemberMutation] = useDeleteMemberMutation();
  const navigate = useNavigate();

  const updateMember = (formData: Partial<Member>) => {
    if (formData) {
      updateMemberMutation({ id, ...formData })
        .unwrap()
        .then(() => {
          message.success('정보 수정이 완료되었습니다.');
          navigate(-1);
        })
        .catch(({ data }) => {
          message.error(data.error.message);
        });
    }
  };

  function deleteMember() {
    deleteMemberMutation(id)
      .unwrap()
      .then(() => {
        message.success('삭제되었습니다.');
        navigate(-1);
      }).catch((({ data }) => {
        message.error(data.error.message);
      }));
  }

  return { updateMember, deleteMember };
}
