import { message } from 'antd';
import { Category } from 'model/category.model';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from 'api/category';
import categoryQueries from 'queryFactory/categoryQueries';

const useCategoryMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addCategoryMutation = useMutation({
    mutationFn: (formData: Category) => addCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.allKey() });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (formData: Category) => updateCategory(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.allKey() });
      message.success('정보 수정이 완료되었습니다.');
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryQueries.allKey() });
      message.success('카테고리가 삭제되었습니다.');
      navigate(-1);
    },
  });

  return {
    addCategory: addCategoryMutation,
    updateCategory: updateCategoryMutation,
    deleteCategory: deleteCategoryMutation,
  };
};

export default useCategoryMutation;
