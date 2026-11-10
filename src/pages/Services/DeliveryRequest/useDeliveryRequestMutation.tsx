import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { processDeliveryRequest } from 'api/deliveryRequest';
import type { DeliveryRequestProcessBody } from 'model/deliveryRequest.model';
import deliveryRequestQueries from 'queryFactory/deliveryRequestQueries';

export default function useDeliveryRequestMutation(id: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const processMutation = useMutation({
    mutationFn: (body: DeliveryRequestProcessBody) => processDeliveryRequest(id, body),
    onSuccess: (_, body) => {
      message.success(body.process_type === 'APPROVE'
        ? '코인 딜리버리 서비스 요청을 승인했습니다.'
        : '코인 딜리버리 서비스 요청을 반려했습니다.');
      queryClient.invalidateQueries({ queryKey: deliveryRequestQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return { processMutation };
}
