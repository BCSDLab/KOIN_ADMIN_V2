import { queryOptions } from '@tanstack/react-query';
import {
  getArticleAiSummary,
  getArticleAiSummaryList,
  getArticleAiSummaryLogs,
  getArticleAiSummaryOverview,
} from 'api/articleAiSummary';
import type {
  ArticleAiSummariesResponse,
  ArticleAiSummaryListParam,
  ArticleAiSummaryLogsParam,
  ArticleAiSummaryLogsResponse,
  TransformedArticleAiSummariesResponse,
  TransformedArticleAiSummaryLogsResponse,
} from 'model/articleAiSummary.model';

const articleAiSummaryQueries = {
  allkeys: () => ['articleAiSummaries'],

  overviewKeys: () => [...articleAiSummaryQueries.allkeys(), 'overview'],
  overview: () => queryOptions({
    queryKey: articleAiSummaryQueries.overviewKeys(),
    queryFn: getArticleAiSummaryOverview,
  }),

  listKeys: (param: ArticleAiSummaryListParam) => [...articleAiSummaryQueries.allkeys(), 'list', param],
  list: (param: ArticleAiSummaryListParam) => queryOptions({
    queryKey: articleAiSummaryQueries.listKeys(param),
    queryFn: () => getArticleAiSummaryList(param),
    select: (data: ArticleAiSummariesResponse): TransformedArticleAiSummariesResponse => ({
      summaries: data.summaries.map((summary) => ({
        id: summary.summary_id,
        article_id: summary.article_id,
        article_title: summary.article_title,
        status: summary.status,
        failure_type: summary.failure_type,
        retry_count: summary.retry_count,
        updated_at: summary.updated_at,
      })),
      total_page: data.total_page,
    }),
  }),

  detailKeys: (id: number) => [...articleAiSummaryQueries.allkeys(), id],
  detail: (id: number) => queryOptions({
    queryKey: articleAiSummaryQueries.detailKeys(id),
    queryFn: () => getArticleAiSummary(id),
    enabled: !!id,
  }),

  logsKeys: (param: ArticleAiSummaryLogsParam) => [...articleAiSummaryQueries.allkeys(), 'logs', param],
  logs: (param: ArticleAiSummaryLogsParam) => queryOptions({
    queryKey: articleAiSummaryQueries.logsKeys(param),
    queryFn: () => getArticleAiSummaryLogs(param),
    select: (data: ArticleAiSummaryLogsResponse): TransformedArticleAiSummaryLogsResponse => ({
      logs: data.logs.map((log) => ({
        id: log.log_id,
        article_id: log.article_id,
        article_title: log.article_title,
        event_type: log.event_type,
        failure_type: log.failure_type,
        message: log.message,
        created_at: log.created_at,
      })),
      total_page: data.total_page,
    }),
  }),
};

export default articleAiSummaryQueries;
