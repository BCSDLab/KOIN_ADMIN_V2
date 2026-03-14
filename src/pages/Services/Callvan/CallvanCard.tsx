import { useState } from 'react';
import { Popover } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, RightOutlined } from '@ant-design/icons';
import type { TransformedCallvanReport } from 'model/callvan.model';
import * as S from './CallvanCard.style';

interface Props {
  report: TransformedCallvanReport;
}

const STATUS_LABEL: Record<string, string> = {
  PENDING: '미처리',
  CONFIRMED: '처리 완료',
};

const PROCESS_TYPE_OPTIONS = [
  { label: '(1차) 주의 안내', value: 'WARNING' },
  { label: '(2차) 콜밴 모집, 참여제한', value: 'TEMPORARY_RESTRICTION_14_DAYS' },
  { label: '(3차) 콜밴 기능 영구 제한', value: 'PERMANENT_RESTRICTION' },
  { label: '신고 반려', value: 'REJECT' },
];

const REASON_CODE_TYPE = {
  NON_PAYMENT: '요금 미납',
  NO_SHOW: '노쇼',
  PROFANITY: '욕설',
  OTHER: '기타',
};

export default function CallvanCard({ report }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <S.ProcessText>
            {`처리 : ${PROCESS_TYPE_OPTIONS.find((o) => o.value === report.process_type)?.label ?? report.process_type}`}
          </S.ProcessText>
        )}
        {isPending && (
          <S.StyledSelect
            placeholder="처리 유형 선택"
            options={PROCESS_TYPE_OPTIONS}
            style={{ width: 180 }}
          />
        )}
      </S.Header>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>피신고자 : </S.Label>
            {`${report.name} (${report.nickname})`}
          </S.InfoItem>
          <S.InfoItem>{report.reported_at}</S.InfoItem>
        </S.InfoGroup>
      </S.InfoRow>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>사유 : </S.Label>
            {report.reasons.map((r) => REASON_CODE_TYPE[r.reason_code as keyof typeof REASON_CODE_TYPE] ?? r.reason_code).join(', ')}
          </S.InfoItem>
          <S.InfoItem>
            <S.Label>누적 </S.Label>
            {`${report.accumulated_report_count}건`}
            {isOpen && (
              <Popover
                open={isModalOpen}
                onOpenChange={(v) => setIsModalOpen(v)}
                trigger="click"
                placement="right"
                title={(
                  <S.PopoverHeader>
                    <span>누적 신고 내역</span>
                    <S.PopoverClose onClick={() => setIsModalOpen(false)} />
                  </S.PopoverHeader>
                )}
                content={(
                  <div>
                    {report.accumulated_reports.map((r, index) => (
                      <div key={r.report_id} style={{ marginBottom: 12 }}>
                        <div>
                          {`${index + 1}. ${r.reported_at.slice(0, 10)}`}
                        </div>
                        <div style={{ paddingLeft: 16 }}>
                          {`사유 : ${r.reasons.map((reason) => REASON_CODE_TYPE[reason.reason_code as keyof typeof REASON_CODE_TYPE] ?? reason.reason_code).join(', ')}`}
                          &nbsp;&nbsp;
                          {`처리 유형 : ${PROCESS_TYPE_OPTIONS.find((o) => o.value === r.process_type)?.label ?? '없음'}`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              >
                <RightOutlined style={{ cursor: 'pointer', marginLeft: 4 }} />
              </Popover>
            )}
          </S.InfoItem>
        </S.InfoGroup>
      </S.InfoRow>
      {isOpen && (
        <>
          <S.SectionTitle>신고 상황</S.SectionTitle>
          <S.SectionContent>{report.description || '-'}</S.SectionContent>
          <S.SectionTitle>첨부 이미지</S.SectionTitle>
          {report.attachment_urls.length > 0 ? (
            <S.ImageRow>
              {report.attachment_urls.map((url) => (
                <S.AttachImage key={url} src={url} alt="첨부 이미지" loading="lazy" />
              ))}
            </S.ImageRow>
          ) : (
            <S.SectionContent>없음</S.SectionContent>
          )}
        </>
      )}
      <S.ToggleButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <CaretUpOutlined /> : <CaretDownOutlined />}
      </S.ToggleButton>
    </S.Container>
  );
}
