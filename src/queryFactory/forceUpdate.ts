import { queryOptions } from '@tanstack/react-query';
import { getAppVersion } from 'api/forceUpdate';
import type { OS } from 'model/forceUpdate.model';

const forceUpdateQueries = {
  allKey: () => ['appVersion'],

  getAppVersion: (type: OS) => queryOptions({
    queryKey: [...forceUpdateQueries.allKey(), type],
    queryFn: () => getAppVersion(type),
  }),
};

export default forceUpdateQueries;
