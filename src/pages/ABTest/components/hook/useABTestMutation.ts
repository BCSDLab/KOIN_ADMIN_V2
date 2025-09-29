import { useMutation } from '@tanstack/react-query';
import { message } from 'antd';
import {
  addABTest, deleteABTest, moveUser, postWinner, putABTest,
} from 'api/abTest';

const useABTestMutation = () => {
  const { mutate: addABTestMutation } = useMutation({
    mutationFn: addABTest,
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });

  const { mutate: modifyABTestMutation } = useMutation({
    mutationFn: putABTest,
    onError: (error) => {
      const errorMessage = error.message || '에러가 발생했습니다.';
      message.error(errorMessage);
    },
  });
  const { mutate: deleteABTestMutation } = useMutation({
    mutationFn: deleteABTest,
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
