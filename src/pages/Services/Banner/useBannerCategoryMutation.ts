import { message } from 'antd';
import { BannerCategoryUpdateForm } from 'model/bannerCategory.model';
import { useUpdateBannerCategoryDescriptionMutation } from 'store/api/bannerCategory';

export default function useBannerCategoryMutation() {
  const [updateBannerCategoryMutation] = useUpdateBannerCategoryDescriptionMutation();

  const updateBannerDescription = (formData: BannerCategoryUpdateForm, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateBannerCategoryMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('설명 수정이 완료되었습니다.');
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  return {
    updateBannerDescription,
  };
}
