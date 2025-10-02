import { queryOptions } from '@tanstack/react-query';
import { getReviewList } from 'api/review';
import type { GetReviewListParam } from 'model/review.model';

const reviewQueries = {
  allkeys: () => ['reivews'],

  reivewListKeys: ({
    page, limit, isReported,
  }: GetReviewListParam) => [...reviewQueries.allkeys(), { page, limit, isReported }],
  reivewList: (param: GetReviewListParam) => queryOptions({
    queryKey: reviewQueries.reivewListKeys(param),
    queryFn: () => getReviewList(param),
  }),
};

export default reviewQueries;
