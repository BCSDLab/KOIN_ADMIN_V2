import { ListPagination } from './common.model';

export type ArticleAiSummaryStatus = 'WAIT' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'SKIPPED';

export type ArticleAiSummaryLogEventType = 'RETRY_WAITING' | 'FAILED' | 'TERMINAL_FAILED' | 'SKIPPED';

export type ArticleAiSummaryFailureType = string;

export interface ArticleAiSummary {
  summary_id: number;
  article_id: number;
  board_id: number;
  article_title: string;
  status: ArticleAiSummaryStatus;
  failure_type: ArticleAiSummaryFailureType;
  failure_message: string | null;
  retry_count: number;
  next_attempt_at: string | null;
  locked_until: string | null;
  worker_id: string | null;
  created_at: string;
  updated_at: string;
  summarized_at: string | null;
  source_updated_at: string;
  model: string;
  prompt_version: string;
}

export interface ArticleAiSummariesResponse extends ListPagination {
  summaries: ArticleAiSummary[];
}

export interface TransformedArticleAiSummary {
  id: number;
  article_id: number;
  article_title: string;
  status: ArticleAiSummaryStatus;
  failure_type: ArticleAiSummaryFailureType;
  retry_count: number;
  updated_at: string;
}

export interface TransformedArticleAiSummariesResponse {
  summaries: TransformedArticleAiSummary[];
  total_page: number;
}

export type ArticleAiSummaryResponse = ArticleAiSummary;

export interface ArticleAiSummaryListParam {
  page: number;
  limit: number;
  status?: ArticleAiSummaryStatus;
}

export interface ArticleAiSummaryStatusCount {
  status: ArticleAiSummaryStatus;
  count: number;
}

export interface ArticleAiSummaryOverviewResponse {
  status_counts: ArticleAiSummaryStatusCount[];
  queue: {
    ready_wait_count: number;
    delayed_wait_count: number;
    processing_count: number;
    expired_processing_count: number;
    retryable_failed_count: number;
  };
  config: {
    scheduler_fixed_delay_ms: number;
    batch_size: number;
    max_retry_count: number;
    failed_retry_window_start_hour: number;
    failed_retry_window_end_hour: number;
  };
}

export interface ArticleAiSummaryLog {
  log_id: number;
  summary_id: number;
  article_id: number;
  board_id: number;
  article_title: string;
  event_type: ArticleAiSummaryLogEventType;
  status: ArticleAiSummaryStatus;
  failure_type: ArticleAiSummaryFailureType | null;
  message: string | null;
  retry_count: number;
  next_attempt_at: string | null;
  worker_id: string | null;
  created_at: string;
}

export interface ArticleAiSummaryLogsResponse extends ListPagination {
  logs: ArticleAiSummaryLog[];
}

export interface TransformedArticleAiSummaryLog {
  id: number;
  article_id: number;
  article_title: string;
  event_type: ArticleAiSummaryLogEventType;
  failure_type: ArticleAiSummaryFailureType | null;
  message: string | null;
  created_at: string;
}

export interface TransformedArticleAiSummaryLogsResponse {
  logs: TransformedArticleAiSummaryLog[];
  total_page: number;
}

export interface ArticleAiSummaryLogsParam {
  page: number;
  limit: number;
  summary_id?: number;
  article_id?: number;
  event_type?: ArticleAiSummaryLogEventType;
  failure_type?: ArticleAiSummaryFailureType;
}
