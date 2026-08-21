import { ArticleAiSummaryStatus } from 'model/articleAiSummary.model';

const STATUS_TAG_COLOR: Record<ArticleAiSummaryStatus, string> = {
  WAIT: 'default',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'error',
  SKIPPED: 'warning',
};

export default STATUS_TAG_COLOR;
