import { message } from 'antd';
import { StoreResponse } from 'model/store.model';
import { useNavigate } from 'react-router-dom';
import {
  useAddStoreMutation, useDeleteStoreMutation, useUndeleteStoreMutation, useUpdateStoreMutation,
} from 'store/api/store';

export default function useStoreMutation(id: number) {
  const [updateStoreMutation] = useUpdateStoreMutation();
  const [deleteStoreMutation] = useDeleteStoreMutation();
  const [addStoreMutation] = useAddStoreMutation();
  const [undeleteStoreMutation] = useUndeleteStoreMutation();
  const navigate = useNavigate();

  function deleteStore() {
    deleteStoreMutation(id)
      .unwrap()
      .then(() => {
        message.success('삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function updateStore(formData: Partial<StoreResponse>) {
    // 불필요한 프로퍼티가 포함될 경우, 400에러가 발생하는 이슈로 업데이트에 직접적으로 필요하지 않은 프로퍼티는 삭제.
    const copyFormData = { ...formData };
    delete copyFormData.menu_categories;
    delete copyFormData.shop_categories;
    delete copyFormData.is_deleted;

    updateStoreMutation({
      id,
      ...copyFormData,
    })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  const addStore = (formData: Partial<StoreResponse>, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    addStoreMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
      });
  };

  function undeleteStore() {
    undeleteStoreMutation(id)
      .unwrap()
      .then(() => {
        message.success('복구되었습니다.');
        navigate(-1);
      }).catch((({ data }) => {
        message.error(data.message);
      }));
  }

  return {
    updateStore, deleteStore, addStore, undeleteStore,
  };
}
