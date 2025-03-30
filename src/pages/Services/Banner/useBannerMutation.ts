import { message } from 'antd';
import { Banner, BannerPriorityParams, BannerUpdateRequest } from 'model/banner.model';
import { useNavigate } from 'react-router-dom';
import {
  useAddBannerMutation, useDeleteBannerMutation,
  useToggleBannerActiveMutation, useUpdateBannerMutation,
  useUpdateBannerPriorityMutation,
} from 'store/api/banner';

export default function useBannerMutation() {
  const [addBannerMutation] = useAddBannerMutation();
  const [updateBannerMutation] = useUpdateBannerMutation();
  const [deleteBannerMutation] = useDeleteBannerMutation();
  const [updateBannerPriorityMutation] = useUpdateBannerPriorityMutation();
  const [toggleBannerActiveMutation] = useToggleBannerActiveMutation();
  const navigate = useNavigate();

  const addBanner = (formData: Partial<Banner>, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    addBannerMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('배너 추가가 완료되었습니다.');
        navigate(-1);
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const updateBanner = (formData: BannerUpdateRequest, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateBannerMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        onSuccess?.();
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const deleteBanner = (id: number, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    deleteBannerMutation(id)
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('배너가 삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const updateBannerPriority = (id: number, body: BannerPriorityParams, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateBannerPriorityMutation({ id, body })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const toggleBannerActive = (
    id: number,
    active: boolean,
    { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    toggleBannerActiveMutation({ id, body: { is_active: active } })
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
    addBanner, updateBanner, deleteBanner, updateBannerPriority, toggleBannerActive,
  };
}
