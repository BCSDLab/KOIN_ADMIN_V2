import { message } from 'antd';
import { Member } from 'model/member.model';
import { useNavigate } from 'react-router-dom';
import { useUpdateMemberMutation } from 'store/api/member';

export default function useMemberMutation() {
  const [updateMemberRequest] = useUpdateMemberMutation();
  const navigate = useNavigate();

  const updateMember = (formData: Member) => {
    if (formData) {
      updateMemberRequest(formData)
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

  return { updateMember };
}
