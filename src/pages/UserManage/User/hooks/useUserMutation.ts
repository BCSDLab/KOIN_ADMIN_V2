import { UserDetail } from 'model/user.model';
import { useUpdateUserMutation } from 'store/api/user';

export default function useUserMutation() {
  const [updateUserRequest] = useUpdateUserMutation();

  const updateUser = (formData: UserDetail) => {
    if (formData) {
      updateUserRequest(formData);
    }
  };

  return { updateUser };
}
