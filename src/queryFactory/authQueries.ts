import { queryOptions } from '@tanstack/react-query';
import { getAdminInfo } from 'api/auth';

const authQueries = {
  allKeys: () => ['auth'],

  adminInfoKey: () => [...authQueries.allKeys(), 'admin', 'info'],
  adminInfo: () => queryOptions({
    queryKey: authQueries.adminInfoKey(),
    queryFn: getAdminInfo,
  }),
};

export default authQueries;
