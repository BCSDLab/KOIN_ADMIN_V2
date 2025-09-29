import accessClient from 'api';
import {
  GetReviewListParam, ReviewListResponse, SetReviewParam,
} from 'model/review.model';

export const getReviewList = async ({ page, limit, isReported }: GetReviewListParam) => {
  const response = await accessClient.get<ReviewListResponse>(`admin/shops/reviews?page=${page}&limit=${limit}&${isReported ? 'is_reported=true' : ''}`);
  return response.data;
};

export const setRivewDismissed = async ({ id, body } : SetReviewParam) => {
  const response = await accessClient.put<string>(`admin/shops/reviews/${id}`, body);
  return response;
};
export const deleteReview = async (id: number) => {
  const response = await accessClient.delete<void>(`/admin/shops/reviews/${id}`);
  return response;
};
