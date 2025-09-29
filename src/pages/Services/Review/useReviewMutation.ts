import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { deleteReview, setRivewDismissed } from 'api/review';
import { SetReviewParam } from 'model/review.model';
import reviewQueries from 'queryFactory/reviewQueries';

export default function useReviewMutation() {
  const queryClient = useQueryClient();

  const deleteReviewMutation = useMutation({
    mutationFn: (id: number) => deleteReview(id),
    onSuccess: () => {
      message.success('리뷰가 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: reviewQueries.allkeys() });
    },
    onError: (error) => {
      message.error(error.message || '리뷰 삭제에 실패했습니다.');
    },
  });

  const setReviewDismissedMutation = useMutation({
    mutationFn: (param: SetReviewParam) => setRivewDismissed(param),
    onSuccess: () => {
      message.success('리뷰 상태가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: reviewQueries.allkeys() });
    },
    onError: (error) => {
      message.error(error.message || '리뷰 상태 변경에 실패했습니다.');
    },
  });

  return { deleteReviewMutation, setReviewDismissedMutation };
}
