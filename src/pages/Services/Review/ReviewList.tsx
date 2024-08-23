import { Checkbox, Skeleton } from 'antd';
import {
  useEffect, useRef, useState,
} from 'react';
import { useGetReviewListQuery } from 'store/api/review';
import * as Common from 'styles/List.style';
import { UpCircleOutlined } from '@ant-design/icons';
import ReviewCard from './ReviewCard';
import * as S from './ReviewList.style';

const LIMIT = 10;

export default function ReviewList() {
  const [page, setPage] = useState(1);
  const [isReported, setIsReported] = useState<boolean>(false);
  const {
    data, isLoading, isFetching,
  } = useGetReviewListQuery({ page, limit: LIMIT, isReported });
  const endOfPage = useRef<HTMLDivElement>(null);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterReportedReview = () => {
    setIsReported((prev) => !prev);
    setPage(1);
  };

  useEffect(() => {
    const getNextPage = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting
        && data && data.total_count > LIMIT * page
        && !isLoading && !isFetching) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(getNextPage);

    if (endOfPage.current) {
      observer.observe(endOfPage.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [data, isLoading, page, isFetching]);

  return (
    <S.Container>
      <Common.Heading>
        리뷰 목록
      </Common.Heading>
      {isLoading ? [1, 2, 3, 4, 5].map((key) => <Skeleton key={key} active />) : (
        <>
          <S.Filter>
            <Checkbox checked={!!isReported} onChange={filterReportedReview} />
            신고된 리뷰만 모아보기
          </S.Filter>
          <S.DataContainer>
            {data && data.reviews.map((review) => (
              <ReviewCard
                review={review}
                key={review.reviewId}
              />
            ))}
            <div ref={endOfPage} style={{ height: '100px' }} />
          </S.DataContainer>
        </>
      )}
      <S.RightDownButton onClick={scrollUp}>
        <UpCircleOutlined />
      </S.RightDownButton>
    </S.Container>
  );
}
