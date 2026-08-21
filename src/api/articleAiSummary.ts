import accessClient from 'api';
import type {
  ArticleAiSummariesResponse,
  ArticleAiSummaryListParam,
  ArticleAiSummaryLogsParam,
  ArticleAiSummaryLogsResponse,
  ArticleAiSummaryOverviewResponse,
  ArticleAiSummaryResponse,
} from 'model/articleAiSummary.model';

export const getArticleAiSummaryList = async (param: ArticleAiSummaryListParam) => {
  const response = await accessClient.get<ArticleAiSummariesResponse>('admin/articles/ai-summaries', { params: param });
  return response.data;
};

export const getArticleAiSummary = async (summaryId: number) => {
  const response = await accessClient.get<ArticleAiSummaryResponse>(`admin/articles/ai-summaries/${summaryId}`);
  return response.data;
};

export const getArticleAiSummaryOverview = async () => {
  const response = await accessClient.get<ArticleAiSummaryOverviewResponse>('admin/articles/ai-summaries/overview');
  return response.data;
};

export const getArticleAiSummaryLogs = async (param: ArticleAiSummaryLogsParam) => {
  const response = await accessClient.get<ArticleAiSummaryLogsResponse>('admin/articles/ai-summaries/logs', { params: param });
  return response.data;
};
