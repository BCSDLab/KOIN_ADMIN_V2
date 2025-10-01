import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import {
  addABTest, deleteABTest, moveUser, postWinner, putABTest,
} from 'api/abTest';
import abTestQueries from 'queryFactory/abTestQueries';

const useABTestMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: addABTestMutation } = useMutation({
    mutationFn: addABTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: abTestQueries.allKeys() });
    },
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });

  const { mutate: modifyABTestMutation } = useMutation({
    mutationFn: putABTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: abTestQueries.allKeys() });
    },
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });
  const { mutate: deleteABTestMutation } = useMutation({
    mutationFn: deleteABTest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: abTestQueries.allKeys() });
    },
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });

  const { mutate: moveUserMutation } = useMutation({
    mutationFn: moveUser,
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });

  const { mutate: postWinnerMutation } = useMutation({
    mutationFn: postWinner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: abTestQueries.allKeys() });
    },
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });

  return {
    addABTestMutation,
    modifyABTestMutation,
    deleteABTestMutation,
    moveUserMutation,
    postWinnerMutation,
  };
};

export default useABTestMutation;
