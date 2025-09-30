import { queryOptions } from '@tanstack/react-query';
import getHistories from 'api/history';
import type { HistoriesRequest } from 'model/history.model';

const historyQueries = {
  allKeys: () => ['histories'] as const,

  historyKeys: (
    {
      page,
      domainId = null,
      limit = 30,
    }: HistoriesRequest,
  ) => [
    ...historyQueries.allKeys(),
    page, domainId, limit,
  ] as const,
  history: (options: HistoriesRequest) => queryOptions({
    queryKey: historyQueries.historyKeys(options),
    queryFn: () => getHistories(options),
    refetchOnMount: true,
  }),
};

export default historyQueries;
