import { message } from 'antd';
import { Category } from 'model/category.model';
import { useNavigate } from 'react-router-dom';
import { useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from 'store/api/category';

const useCategoryMutation = () => {
  const [addCategoryMutation] = useAddCategoryMutation();
  const [updateCategoryMutation] = useUpdateCategoryMutation();
  const [deleteCategoryMutation] = useDeleteCategoryMutation();
  const navigate = useNavigate();

  const addCategory = (formData: Category, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    addCategoryMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const updateCategory = (formData: Category, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateCategoryMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('정보 수정이 완료되었습니다.');
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
        navigate(-1);
      });
  };

  const deleteCategory = (id: number, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    deleteCategoryMutation(id)
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('카테고리가 삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  return { addCategory, updateCategory, deleteCategory };
};

export default useCategoryMutation;
