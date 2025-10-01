import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  addBanner, deleteBanner, toggleBannerActive, updateBanner, updateBannerPriority,
} from 'api/banner';
import bannerQueries from 'queryFactory/banner';

export default function useBannerMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: addBannerMutation } = useMutation({
    mutationFn: addBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueries.allKeys });
      message.success('배너 추가가 완료되었습니다.');
      navigate(-1);
    },

    onError: (error) => {
      message.error(error.message);
    },
  });

  const { mutate: updateBannerMutation } = useMutation({
    mutationFn: updateBanner,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: bannerQueries.bannerKey(data.id) });
      message.success('정보 수정이 완료되었습니다.');
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { mutate: deleteBannerMutation } = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueries.allKeys });
      message.success('배너가 삭제되었습니다.');
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message);
      navigate(-1);
    },
  });

  const { mutate: updateBannerPriorityMutation } = useMutation({
    mutationFn: updateBannerPriority,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueries.allKeys });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { mutate: toggleBannerActiveMutation } = useMutation({
    mutationFn: toggleBannerActive,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bannerQueries.allKeys });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  return {
    addBanner: addBannerMutation,
    updateBanner: updateBannerMutation,
    deleteBanner: deleteBannerMutation,
    updateBannerPriority: updateBannerPriorityMutation,
    toggleBannerActive: toggleBannerActiveMutation,
  };
}
