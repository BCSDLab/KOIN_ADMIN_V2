import { message } from 'antd';
import { NoticeUpdateForm } from 'model/notice.model';
import { useNavigate } from 'react-router-dom';
import { useUpdateNoticeMutation } from 'store/api/notice';

const useNoticeMutation = () => {
  // const [addCategoryMutation] = useAddCategoryMutation();
  const [updateNoticeMutation] = useUpdateNoticeMutation();
  // const [deleteCategoryMutation] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  // const addCategory = (formData: Category, {
  //   onSuccess,
  //   onError,
  // }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
  //   addCategoryMutation({ ...formData })
  //     .unwrap()
  //     .then(() => {
  //       onSuccess?.();
  //     })
  //     .catch(({ data }) => {
  //       onError?.(data.message);
  //       message.error(data.message);
  //     });
  // };

  const updateNotice = (formData: NoticeUpdateForm, {
    onSuccess,
    onError,
  }: { onSuccess?: () => string, onError?: (message: string) => void } = {}) => {
    updateNoticeMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('공지사항 수정이 완료되었습니다.');
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
        navigate(-1);
      });
  };

  // const deleteCategory = (id: number, {
  //   onSuccess,
  //   onError,
  // }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
  //   deleteCategoryMutation(id)
  //     .unwrap()
  //     .then(() => {
  //       onSuccess?.();
  //       message.success('카테고리가 삭제되었습니다.');
  //       navigate(-1);
  //     })
  //     .catch(({ data }) => {
  //       onError?.(data.message);
  //       message.error(data.message);
  //     });
  // };

  // return { addCategory, updateCategory, deleteCategory };
  return { updateNotice };
};

export default useNoticeMutation;
