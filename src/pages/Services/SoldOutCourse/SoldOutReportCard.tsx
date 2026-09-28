import useBooleanState from 'utils/hooks/useBoolean';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import type {
  SoldOutReport,
} from 'model/soldOutReport.model';
import * as S from './SoldOutReportCard.style';

interface Props {
  report: SoldOutReport;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: '미처리',
  CONFIRMED: '처리 완료',
};

const PROCESS_TYPE_OPTIONS = [
  { label: '승인', value: 'APPROVE' },
  { label: '반려', value: 'REJECT' },
];

export default function SoldOutReportCard({ report }: Props) {
  const { value: isOpen, changeValue: toggleOpen } = useBooleanState(false);
  const isPending = report.report_status === 'PENDING';

  return (
    <S.Container isPending={isPending}>
      <S.Header>
        <S.HeaderLeft>
          <S.StatusBadge isPending={isPending}>
            {STATUS_LABEL[report.report_status] ?? report.report_status}
          </S.StatusBadge>
        </S.HeaderLeft>
        {!isPending && (
          <S.ProcessText processType={report.process_type}>
            {`${PROCESS_TYPE_OPTIONS.find((o) => o.value === report.process_type)?.label ?? report.process_type}`}
          </S.ProcessText>
        )}
      </S.Header>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>품절 코스 : </S.Label>
            {report.sold_out_course}
          </S.InfoItem>
          <S.InfoItem>
            <S.Label>제보시간 : </S.Label>
            {report.reported_at}
          </S.InfoItem>
        </S.InfoGroup>
      </S.InfoRow>
      {isOpen && (
        <>
          <S.InfoRow>
            <S.InfoGroup>
              <S.InfoItem>
                <S.Label>처리자 : </S.Label>
                {report.processor ?? '-'}
              </S.InfoItem>
              <S.InfoItem>
                <S.Label>처리 시간 : </S.Label>
                {report.processed_at ?? '-'}
              </S.InfoItem>
            </S.InfoGroup>
          </S.InfoRow>
          <S.InfoRow>
            <S.InfoGroup>
              <S.InfoItem>
                <S.Label>제보자 : </S.Label>
                {report.reporter}
              </S.InfoItem>
            </S.InfoGroup>
          </S.InfoRow>
          {report.image_urls && report.image_urls.length > 0 ? (
            <S.ImageRow>
              {report.image_urls.map((url) => (
                <S.StyledImage
                  key={url}
                  src={url}
                  alt="첨부이미지"
                  width={120}
                  height={120}
                />
              ))}
            </S.ImageRow>
          ) : (
            <S.SectionContent>없음</S.SectionContent>
          )}
        </>
      )}
      <S.ToggleButton type="button" onClick={toggleOpen}>
        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </S.ToggleButton>
    </S.Container>
  );
}
