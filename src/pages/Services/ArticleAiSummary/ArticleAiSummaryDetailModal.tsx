import { useQuery } from '@tanstack/react-query';
import { Descriptions, Modal, Tag } from 'antd';
import articleAiSummaryQueries from 'queryFactory/articleAiSummaryQueries';
import STATUS_TAG_COLOR from './statusTag';

interface Props {
  summaryId: number | null;
  onClose: () => void;
}

export default function ArticleAiSummaryDetailModal({ summaryId, onClose }: Props) {
  const { data } = useQuery({
    ...articleAiSummaryQueries.detail(summaryId ?? 0),
    enabled: !!summaryId,
  });

  return (
    <Modal
      title="게시글 AI 요약 상세"
      open={!!summaryId}
      onCancel={onClose}
      footer={null}
      width={720}
    >
      {data && (
        <Descriptions column={3} bordered size="small">
          <Descriptions.Item label="요약 ID">{data.summary_id}</Descriptions.Item>
          <Descriptions.Item label="게시글 ID">{data.article_id}</Descriptions.Item>
          <Descriptions.Item label="게시판 ID">{data.board_id}</Descriptions.Item>
          <Descriptions.Item label="상태">
            <Tag color={STATUS_TAG_COLOR[data.status]}>{data.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="실패 유형">{data.failure_type || '-'}</Descriptions.Item>
          <Descriptions.Item label="재시도 횟수">{data.retry_count}</Descriptions.Item>
          <Descriptions.Item label="모델">{data.model}</Descriptions.Item>
          <Descriptions.Item label="프롬프트 버전">{data.prompt_version}</Descriptions.Item>
          <Descriptions.Item label="워커 ID">{data.worker_id || '-'}</Descriptions.Item>
          <Descriptions.Item label="생성일">{data.created_at}</Descriptions.Item>
          <Descriptions.Item label="수정일">{data.updated_at}</Descriptions.Item>
          <Descriptions.Item label="다음 시도 예정">{data.next_attempt_at || '-'}</Descriptions.Item>
          <Descriptions.Item label="요약 완료일" span={2}>{data.summarized_at || '-'}</Descriptions.Item>
          <Descriptions.Item label="게시글 제목" span={3}>{data.article_title}</Descriptions.Item>
          <Descriptions.Item label="실패 메시지" span={3}>{data.failure_message || '-'}</Descriptions.Item>
        </Descriptions>
      )}
    </Modal>
  );
}
