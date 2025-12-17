import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { updateBannerCategoryDescription } from 'api/bannerCategory';
import bannerCategoryQueries from 'queryFactory/bannerCategoryQueries';

export default function useBannerCategoryMutation() {
  const queryClient = useQueryClient();
  const { mutate: updateBannerCategoryMutation } = useMutation({
    mutationFn: updateBannerCategoryDescription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerCategoryQueries.allKeys });
      message.success('설명 수정이 완료되었습니다.');
    },

    onError: (error) => {
      message.error(error.message);
    },
  });

  return {
    updateBannerDescription: updateBannerCategoryMutation,
  };
}
