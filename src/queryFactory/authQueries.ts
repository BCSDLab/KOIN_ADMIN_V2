import { queryOptions } from '@tanstack/react-query';
import { getMyInfo } from 'api/auth';

const authQueries = {
  allKeys: () => ['auth'],

  adminInfoKey: () => [...authQueries.allKeys(), 'admin', 'info'],
  adminInfo: () => queryOptions({
    queryKey: authQueries.adminInfoKey(),
    queryFn: getMyInfo,
  }),
};

export default authQueries;
