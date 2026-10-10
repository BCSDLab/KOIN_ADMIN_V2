import { useQuery } from '@tanstack/react-query';
import { Skeleton } from 'antd';
import useBooleanState from 'utils/hooks/useBoolean';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import type { SoldOutReportSummary } from 'model/dining.model';
import diningQueries from 'queryFactory/diningQueries';
import * as S from './SoldOutReportCard.style';

interface Props {
  report: SoldOutReportSummary;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: '미처리',
  APPROVED: '승인',
  REJECTED: '반려',
};

const DINING_TYPE_LABEL: Record<string, string> = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
};

const WEEKDAY_LABEL = ['일', '월', '화', '수', '목', '금', '토'];

const getWeekdayLabel = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);
  return WEEKDAY_LABEL[new Date(year, month - 1, day).getDay()];
};

export default function SoldOutReportCard({ report }: Props) {
  const { value: isOpen, changeValue: toggleOpen } = useBooleanState(false);
  const isPending = report.status === 'PENDING';

  const { data: detail, isLoading: isDetailLoading } = useQuery({
    ...diningQueries.soldOutReportDetail(report.report_id),
    enabled: isOpen,
  });

  return (
    <S.Container isPending={isPending}>
      <S.Header>
        <S.HeaderLeft>
          <S.StatusBadge status={report.status}>
            {STATUS_LABEL[report.status] ?? report.status}
          </S.StatusBadge>
        </S.HeaderLeft>
      </S.Header>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>품절 코스 : </S.Label>
            {`${report.dining.date.replaceAll('-', '.')}(${getWeekdayLabel(report.dining.date)}) ${DINING_TYPE_LABEL[report.dining.type]} ${report.dining.place}`}
          </S.InfoItem>
          <S.InfoItem>
            <S.Label>제보시간 : </S.Label>
            {report.created_at.replaceAll('-', '.').slice(0, 16)}
          </S.InfoItem>
        </S.InfoGroup>
      </S.InfoRow>
      {isOpen && (
        <>
          <S.InfoRow>
            <S.InfoGroup>
              <S.InfoItem>
                <S.Label>처리자 : </S.Label>
                {report.processor?.display_name ?? '-'}
              </S.InfoItem>
              <S.InfoItem>
                <S.Label>처리 시간 : </S.Label>
                {report.processed_at ?? '-'}
              </S.InfoItem>
            </S.InfoGroup>
          </S.InfoRow>
          {report.reason && (
            <S.InfoRow>
              <S.InfoGroup>
                <S.InfoItem>
                  <S.Label>사유 : </S.Label>
                  {report.reason}
                </S.InfoItem>
              </S.InfoGroup>
            </S.InfoRow>
          )}
          {isDetailLoading ? (
            <Skeleton active paragraph={{ rows: 2 }} />
          ) : (
            <>
              <S.InfoRow>
                <S.InfoGroup>
                  <S.InfoItem>
                    <S.Label>제보자 : </S.Label>
                    {detail?.reporter.name ?? '-'}
                  </S.InfoItem>
                </S.InfoGroup>
              </S.InfoRow>
              {detail?.image_url ? (
                <S.ImageRow>
                  <S.StyledImage
                    src={detail.image_url}
                    alt="첨부이미지"
                    width={120}
                    height={120}
                  />
                </S.ImageRow>
              ) : (
                <S.SectionContent>없음</S.SectionContent>
              )}
            </>
          )}
          {isPending && (
            <S.SlackNotice>Slack에서 처리 가능합니다.</S.SlackNotice>
          )}
        </>
      )}
      <S.ToggleButton type="button" onClick={toggleOpen}>
        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </S.ToggleButton>
    </S.Container>
  );
}
