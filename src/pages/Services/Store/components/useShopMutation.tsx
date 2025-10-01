import { message } from 'antd';
import type { StoreDetailForm, StoreResponse } from 'model/store.model';
import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addShop,
  updateShop,
  deleteShop,
  undeleteShop,
} from 'api/shop';
import shopQueries from 'queryFactory/shopQueries';

export default function useShopMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addShopMutation = useMutation({
    mutationFn: (body: Partial<StoreResponse>) => addShop(body),
    onSuccess: () => {
      message.success('가게 추가가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: shopQueries.allKeys() });
    },
    onError: (error) => {
      message.error(error?.message ?? '가게 추가 실패');
    },
  });

  const updateShopMutation = useMutation({
    mutationFn: (payload: { id: number } & Partial<StoreDetailForm>) => updateShop(payload),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: shopQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error?.message ?? '수정 실패');
    },
  });

  const deleteShopMutation = useMutation({
    mutationFn: (id:number) => deleteShop(id),
    onSuccess: () => {
      message.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: shopQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error?.message ?? '삭제 실패');
    },
  });

  const undeleteShopMutation = useMutation({
    mutationFn: (id:number) => undeleteShop(id),
    onSuccess: () => {
      message.success('복구되었습니다.');
      queryClient.invalidateQueries({ queryKey: shopQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error?.message ?? '복구 실패');
    },
  });

  return {
    addShopMutation,
    updateShopMutation,
    deleteShopMutation,
    undeleteShopMutation,
  };
}
