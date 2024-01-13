import { message } from 'antd';
import { UserDetail } from 'model/user.model';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserMutation } from 'store/api/user';
import filterObject from 'utils/ts/filterObject';

export default function useUserMutation() {
  const [updateUserRequest] = useUpdateUserMutation();
  const navigate = useNavigate();

  const updateUser = (formData: UserDetail) => {
    if (formData) {
      updateUserRequest(filterObject(
        formData,
        ['id', 'email', 'gender', 'major', 'name', 'nickname', 'phone_number', 'student_number'],
      )).unwrap()
        .then(() => {
          message.success('정보 수정이 완료되었습니다.');
          navigate(-1);
        })
        .catch(({ data }) => {
          message.error(data.error.message);
        });
    }
  };

  return { updateUser };
}
