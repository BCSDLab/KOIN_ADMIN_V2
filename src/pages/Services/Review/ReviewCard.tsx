import { ReviewContent } from 'model/review.model';
import { Button, message, Modal } from 'antd';
import { useState } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useDeleteReviewMutation, useSetReviewDismissedMutation } from 'store/api/review';
import * as S from './ReviewCard.style';

interface Props {
  review: ReviewContent
}

const KOIN_URL = process.env.REACT_APP_API_PATH?.includes('stage') ? 'https://stage.koreatech.in' : 'https://koreatech.in';

export default function ReviewCard({ review }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const [deleteReview, {
    isLoading: isDeleteLoading,
    isError: isDeleteError,
  }] = useDeleteReviewMutation();
  const [dismissReview, {
    isLoading: isDismissLoading,
    isError: isDismissError,
  }] = useSetReviewDismissedMutation();

  if (isDeleteError) {
    message.error('리뷰 삭제에 실패했습니다');
  }
  if (isDismissError) {
    message.error('리뷰 상태 변경에 실패했습니다.');
  }

  const deleteSpecificReview = () => {
    deleteReview(review.reviewId);
  };

  const dismissSpecificReview = () => {
    dismissReview({
      id: review.reviewId,
      body: {
        report_status: 'DISMISSED',
      },
    });
  };

  return (
    <S.Container $isHandle={review.isHaveUnhandledReport}>
      <S.Row>
        <S.RowItem>
          <S.Item>
            {review.shop.shopName}
          </S.Item>
          <S.Item>
            {review.createdAt}
          </S.Item>
        </S.RowItem>
        <S.RowItem>
          <S.Item>
            <S.Shortcut href={`${KOIN_URL}/store/${review.shop.shopId}?state=리뷰`} target="_blank" rel="noreferrer">식당 페이지 바로가기</S.Shortcut>
          </S.Item>
          <S.Item>
            <Button
              danger
              disabled={isDeleteLoading}
              onClick={() => setIsModalOpen(true)}
            >
              삭제하기
            </Button>
          </S.Item>
        </S.RowItem>
      </S.Row>
      <S.Row>
        <S.RowItem>
          <S.Item>
            별점:
            {' '}
            {review.rating}
          </S.Item>
          {!isOpen && (
            <S.Item>
              {review.content}
            </S.Item>
          )}
        </S.RowItem>
      </S.Row>
      {isOpen && (
        <>
          <S.Row>
            <div>
              리뷰 내용:
              {' '}
              {review.content}
            </div>
          </S.Row>
          <S.Row>
            <div>
              사진:
              {' '}
              {review.imageUrls.length > 0 ? review.imageUrls.map((image) => (
                <S.MenuImage
                  src={image}
                  key={image}
                  loading="lazy"
                  alt="리뷰 이미지"
                />
              )) : '없음'}
            </div>
          </S.Row>
          <S.Row>
            <div>
              이용 메뉴:
              {' '}
              {review.menuNames.length > 0 ? review.menuNames.map((menu) => <div key={menu}>{menu}</div>) : '미기재'}
            </div>
          </S.Row>
          <S.Row>
            <div>
              수정이력:
              {' '}
              {review.isModified ? 'O' : 'X'}
            </div>
          </S.Row>
          <S.AroundRow>
            <S.Item>
              {review.isHaveUnhandledReport ? '신고정보' : '신고이력'}
            </S.Item>
          </S.AroundRow>
          {review.reports.length > 0
            ? (
              <S.Row>
                <S.Item>
                  <Button onClick={() => setIsReportOpen(true)}>확인하기</Button>
                </S.Item>
                {review.isHaveUnhandledReport
                  && (
                    <S.Item>
                      <Button
                        onClick={dismissSpecificReview}
                        disabled={isDismissLoading}
                      >
                        유지하기
                      </Button>
                    </S.Item>
                  )}
              </S.Row>

            ) : '없음'}
        </>
      )}
      <S.ToggleButton type="button" onClick={toggle}>
        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </S.ToggleButton>
      <Modal open={isModalOpen} footer={null} onCancel={() => setIsModalOpen(false)}>
        <S.AroundRow>
          정말로 삭제하시겠습니까?
          <S.Item>
            <Button
              danger
              onClick={() => {
                deleteSpecificReview();
                setIsModalOpen(false);
              }}
            >
              삭제
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>취소</Button>
          </S.Item>
        </S.AroundRow>
      </Modal>
      <Modal open={isReportOpen} onCancel={() => setIsReportOpen(false)} footer={null}>
        {review.reports.map((report, idx) => (
          <S.Row
            key={report.reportId}
          >
            {idx + 1}
            .
            {' '}
            {report.content}
          </S.Row>
        ))}
      </Modal>
    </S.Container>
  );
}
