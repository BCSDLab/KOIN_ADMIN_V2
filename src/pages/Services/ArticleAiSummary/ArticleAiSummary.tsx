import { useQuery } from '@tanstack/react-query';
import {
  Card, Descriptions, Modal, Select, Statistic, Tabs, Tag,
} from 'antd';
import { useState } from 'react';
import CustomTable from 'components/common/CustomTable';
import articleAiSummaryQueries from 'queryFactory/articleAiSummaryQueries';
import type {
  ArticleAiSummaryLogEventType,
  ArticleAiSummaryStatus,
  TransformedArticleAiSummary,
  TransformedArticleAiSummaryLog,
} from 'model/articleAiSummary.model';
import ArticleAiSummaryDetailModal from './ArticleAiSummaryDetailModal';
import STATUS_TAG_COLOR from './statusTag';
import * as S from './ArticleAiSummary.style';

const STATUS_OPTIONS: ArticleAiSummaryStatus[] = ['WAIT', 'PROCESSING', 'SUCCESS', 'FAILED', 'SKIPPED'];
const EVENT_TYPE_OPTIONS: ArticleAiSummaryLogEventType[] = ['RETRY_WAITING', 'FAILED', 'TERMINAL_FAILED', 'SKIPPED'];

function SummaryListTab() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<ArticleAiSummaryStatus | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data } = useQuery(articleAiSummaryQueries.list({ page, limit: 10, status }));

  return (
    <>
      <S.FilterBar>
        <Select
          allowClear
          placeholder="상태 필터"
          style={{ width: 180 }}
          value={status}
          onChange={setStatus}
          options={STATUS_OPTIONS.map((value) => ({ value, label: value }))}
        />
      </S.FilterBar>
      {data && (
        <S.TableWrapper>
          <CustomTable<TransformedArticleAiSummary>
            data={data.summaries}
            pagination={{
              current: page,
              onChange: setPage,
              total: data.total_page,
            }}
            hiddenColumns={['id']}
            columnSize={[10, 40, 12, 15, 10, 13]}
            onClick={setSelectedId}
            columns={[
              {
                key: 'status',
                render: (value: ArticleAiSummaryStatus) => (
                  <Tag color={STATUS_TAG_COLOR[value]}>{value}</Tag>
                ),
              },
            ]}
          />
        </S.TableWrapper>
      )}
      <ArticleAiSummaryDetailModal summaryId={selectedId} onClose={() => setSelectedId(null)} />
    </>
  );
}

function LogListTab() {
  const [page, setPage] = useState(1);
  const [eventType, setEventType] = useState<ArticleAiSummaryLogEventType | undefined>(undefined);
  const [selectedLog, setSelectedLog] = useState<TransformedArticleAiSummaryLog | null>(null);

  const { data } = useQuery(
    articleAiSummaryQueries.logs({ page, limit: 10, event_type: eventType }),
  );

  return (
    <>
      <S.FilterBar>
        <Select
          allowClear
          placeholder="이벤트 유형 필터"
          style={{ width: 200 }}
          value={eventType}
          onChange={setEventType}
          options={EVENT_TYPE_OPTIONS.map((value) => ({ value, label: value }))}
        />
      </S.FilterBar>
      {data && (
        <S.TableWrapper>
          <CustomTable<TransformedArticleAiSummaryLog>
            data={data.logs}
            pagination={{
              current: page,
              onChange: setPage,
              total: data.total_page,
            }}
            hiddenColumns={['id', 'failure_type', 'message']}
            columnSize={[15, 45, 20, 20]}
            onClick={(id: number) => {
              const log = data.logs.find((item) => item.id === id);
              if (log) setSelectedLog(log);
            }}
          />
        </S.TableWrapper>
      )}
      <Modal
        title="작업 로그 상세"
        open={!!selectedLog}
        onCancel={() => setSelectedLog(null)}
        footer={null}
        width={640}
      >
        {selectedLog && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="게시글 ID">{selectedLog.article_id}</Descriptions.Item>
            <Descriptions.Item label="이벤트 유형">{selectedLog.event_type}</Descriptions.Item>
            <Descriptions.Item label="실패 유형">{selectedLog.failure_type || '-'}</Descriptions.Item>
            <Descriptions.Item label="생성일">{selectedLog.created_at}</Descriptions.Item>
            <Descriptions.Item label="게시글 제목" span={2}>{selectedLog.article_title}</Descriptions.Item>
            <Descriptions.Item label="메시지" span={2}>{selectedLog.message || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </>
  );
}

export default function ArticleAiSummaryPage() {
  const { data: overview } = useQuery(articleAiSummaryQueries.overview());
  const countOf = (status: ArticleAiSummaryStatus) => (
    overview?.status_counts.find((item) => item.status === status)?.count ?? 0
  );

  return (
    <S.Container>
      <S.Heading>게시글 AI 요약</S.Heading>
      <S.OverviewCardWrapper>
        <Card><Statistic title="대기" value={countOf('WAIT')} /></Card>
        <Card><Statistic title="처리중" value={countOf('PROCESSING')} /></Card>
        <Card><Statistic title="성공" value={countOf('SUCCESS')} valueStyle={{ color: '#3f8600' }} /></Card>
        <Card><Statistic title="실패" value={countOf('FAILED')} valueStyle={{ color: '#cf1322' }} /></Card>
        <Card><Statistic title="스킵" value={countOf('SKIPPED')} /></Card>
      </S.OverviewCardWrapper>
      <Tabs
        items={[
          { key: 'list', label: '요약 작업 목록', children: <SummaryListTab /> },
          { key: 'logs', label: '작업 로그', children: <LogListTab /> },
        ]}
      />
    </S.Container>
  );
}
