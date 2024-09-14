import { message } from 'antd';
import { ABTest, ABTestUserMoveRequest, ModifyABTest } from 'model/abTest.model';
import {
  useAddABTestMutation,
  useModifyABTestMutation,
  useDeleteABTestMutation,
  useMoveUserMutation,
} from 'store/api/abtest';

const useABTestMutation = () => {
  const [addABTestMutation] = useAddABTestMutation();
  const [modifyABTestMutation] = useModifyABTestMutation();
  const [deleteABTestMutation] = useDeleteABTestMutation();
  const [moveUserMutation] = useMoveUserMutation();

  const addABTest = (
    formData: ABTest,
    {
      onSuccess,
      onError,
    }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    addABTestMutation(formData)
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        const errorMessage = error.data?.message || '에러가 발생했습니다.';
        onError?.(errorMessage);
        message.error(errorMessage);
      });
  };

  const modifyABTest = (
    id: string | number | undefined,
    formData: ModifyABTest['data'],
    {
      onSuccess,
      onError,
    }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    if (!id) {
      const errorMessage = '유효한 ID가 필요합니다.';
      onError?.(errorMessage);
      message.error(errorMessage);
      return;
    }
    modifyABTestMutation({ id, data: formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        const errorMessage = error.data?.message || '에러가 발생했습니다.';
        onError?.(errorMessage);
        message.error(errorMessage);
      });
  };

  const deleteABTest = (
    id: string | number | undefined,
    {
      onSuccess,
      onError,
    }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
  ) => {
    if (!id) {
      const errorMessage = '유효한 ID가 필요합니다.';
      onError?.(errorMessage);
      message.error(errorMessage);
      return;
    }

    deleteABTestMutation(id)
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        const errorMessage = error.data?.message || '에러가 발생했습니다.';
        onError?.(errorMessage);
        message.error(errorMessage);
      });
  };

  const moveUser = (data : ABTestUserMoveRequest) => {
    moveUserMutation(data)
      .unwrap()
      .then(() => {
        message.success('수동 추가 성공');
      })
      .catch((error) => {
        const errorMessage = error.data?.message || '에러가 발생했습니다.';
        message.error(errorMessage);
      });
  };
  return {
    addABTest, modifyABTest, deleteABTest, moveUser,
  };
};

export default useABTestMutation;
