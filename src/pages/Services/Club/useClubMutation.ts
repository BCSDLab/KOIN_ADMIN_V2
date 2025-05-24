import { message } from 'antd';
import { ClubRequest, ClubUpdateRequest } from 'model/club.model';
import { useNavigate } from 'react-router-dom';
import { useAddClubMutation, useToggleClubActiveMutation, useUpdateClubMutation } from 'store/api/club';

export default function useClubMutation() {
  const [addClubMutation] = useAddClubMutation();
  const [updateClubMutation] = useUpdateClubMutation();
  const [toggleClubActiveMutation] = useToggleClubActiveMutation();
  const navigate = useNavigate();

  const addClub = (formData: Partial<ClubRequest>, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    addClubMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('동아리 추가가 완료되었습니다.');
        navigate(-1);
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const updateClub = (formData: ClubUpdateRequest, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateClubMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const toggleClubActive = (
    id: number,
    active: boolean,
    { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    toggleClubActiveMutation({ id, body: { is_active: active } })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  return {
    addClub, updateClub, toggleClubActive,
  };
}
