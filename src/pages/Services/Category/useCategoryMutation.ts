import { message } from 'antd';
import { Category } from 'model/category.model';
import { useAddCategoryMutation } from 'store/api/category';

const useCategoryMutation = () => {
  const [addCategoryMutation] = useAddCategoryMutation();

  function addCategory(formData: Category, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) {
    return addCategoryMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  }

  return { addCategory };
};

export default useCategoryMutation;
