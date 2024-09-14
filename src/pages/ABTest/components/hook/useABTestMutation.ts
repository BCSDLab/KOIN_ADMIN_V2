import { message } from 'antd';
import { ABTest, ModifyABTest } from 'model/abTest.model';
import { useAddABTestMutation, useModifyABTestMutation } from 'store/api/abtest';

const useABTestMutation = () => {
  const [addABTestMutation] = useAddABTestMutation();
  const [modifyABTestMutation] = useModifyABTestMutation();
  // const [deleteABTestMutation] = useDeleteABTestMutation();

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

  return { addABTest, modifyABTest };
};

export default useABTestMutation;
