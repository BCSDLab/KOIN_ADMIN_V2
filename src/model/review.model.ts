export interface ReviewListResponse {
  total_count: number,
  current_count: number,
  current_page: number,
  reviews: ReviewContent[]
}

export interface ReviewContent {
  reviewId: number,
  rating: number,
  nickName: string,
  content: string,
  imageUrls: string[],
  menuNames: string[],
  isModified: boolean,
  isHaveUnhandledReport: boolean,
  createdAt: string,
  reports: ReportedReviewContent[]
  shop: {
    shopId: number,
    shopName: string,
  }
}

export interface ReportedReviewContent {
  reportId: number,
  title: string,
  content: string,
  nickName: string,
  status: string,
}

export interface GetReviewListParam {
  page: number;
  limit: number;
  isReported: boolean;
}

export interface SetReviewParam {
  id: number;
  page: number;
  body: {
    report_status: string
  }
}
