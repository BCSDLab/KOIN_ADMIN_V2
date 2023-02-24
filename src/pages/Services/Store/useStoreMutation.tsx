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
    updateStoreMutation({ id, ...formData })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function addStore(formData: Partial<StoreResponse>) {
    if (FormData) {
      addStoreMutation(formData)
        .unwrap()
        .then(() => {
          message.success('추가되었습니다.');
        })
        .catch(({ data }) => {
          message.error(data.error.message);
        });
    }
  }

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
  } as const;
}
