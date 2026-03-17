import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBoolean';
import { message, Modal, Popover } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, RightOutlined } from '@ant-design/icons';
import type { CallvanParam, TransformedCallvanReport } from 'model/callvan.model';
import { useProcessCallvan } from 'queryFactory/callvanQueries';
import * as S from './CallvanCard.style';

interface Props {
  report: TransformedCallvanReport;
  param: CallvanParam;
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

const formatReason = (reason: { reason_code: string; custom_text: string }) => {
  const label = REASON_CODE_TYPE[reason.reason_code as keyof typeof REASON_CODE_TYPE]
    ?? reason.reason_code;
  return reason.reason_code === 'OTHER' && reason.custom_text
    ? `${label}(${reason.custom_text})`
    : label;
};

export default function CallvanCard({ report, param }: Props) {
  const { value: isOpen, changeValue: toggleOpen } = useBooleanState(false);
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState(false);
  const [selectedProcessType, setSelectedProcessType] = useState<string | null>(null);
  const isPending = report.report_status === 'PENDING';

  const { mutate: processCallvan, isPending: isProcessing } = useProcessCallvan(param);

  const handleConfirm = () => {
    if (!selectedProcessType) return;
    processCallvan(
      { reportId: report.id, process_type: selectedProcessType },
      {
        onSuccess: () => {
          message.success('처리가 완료되었습니다.');
          setSelectedProcessType(null);
        },
        onError: (error: unknown) => {
          type ApiError = { response?: { data?: { message?: string } } };
          const msg = (error as ApiError)?.response?.data?.message;
          message.error(msg ?? '처리 중 오류가 발생했습니다.');
        },
      },
    );
  };

  const handleCancel = () => {
    setSelectedProcessType(null);
  };

  return (
    <S.Container isPending={isPending}>
      <S.Header>
        <S.HeaderLeft>
          <S.StatusBadge isPending={isPending}>
            {STATUS_LABEL[report.report_status] ?? report.report_status}
          </S.StatusBadge>
        </S.HeaderLeft>
        {isPending
          ? (
            <S.StyledSelect
              placeholder="처리 유형 선택"
              options={PROCESS_TYPE_OPTIONS}
              value={selectedProcessType}
              onChange={setSelectedProcessType}
            />
          )
          : (
            <S.ProcessText>
              {`처리 : ${PROCESS_TYPE_OPTIONS.find((o) => o.value === report.process_type)?.label ?? report.process_type}`}
            </S.ProcessText>
          )}
      </S.Header>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>피신고자 : </S.Label>
            {`${report.name} (${report.nickname})`}
          </S.InfoItem>
          <S.InfoItem>
            {`${report.reported_at.slice(0, 10)} ${report.reported_at.slice(11, 19)}`}
          </S.InfoItem>
        </S.InfoGroup>
      </S.InfoRow>
      <S.InfoRow>
        <S.InfoGroup>
          <S.InfoItem>
            <S.Label>사유 : </S.Label>
            {report.reasons.map(formatReason).join(', ')}
          </S.InfoItem>
          <S.InfoItem>
            <S.Label>누적 </S.Label>
            {`${report.accumulated_report_count}건`}
            {isOpen && (
              <Popover
                open={isModalOpen}
                onOpenChange={(v) => (v ? openModal() : closeModal())}
                trigger="click"
                placement="right"
                title={(
                  <S.PopoverHeader>
                    <span>누적 신고 내역</span>
                    <S.PopoverClose onClick={closeModal} />
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
                          {`사유 : ${r.reasons.map(formatReason).join(', ')}`}
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
      <Modal
        title="처리 유형 확인"
        open={!!selectedProcessType}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="확인"
        cancelText="취소"
        confirmLoading={isProcessing}
      >
        {`"${PROCESS_TYPE_OPTIONS.find((o) => o.value === selectedProcessType)?.label}" 처리하시겠습니까?`}
      </Modal>
    </S.Container>
  );
}
