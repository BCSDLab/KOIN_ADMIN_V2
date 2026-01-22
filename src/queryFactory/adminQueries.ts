import { queryOptions } from '@tanstack/react-query';
import { getAdminInfo, getAdminList } from 'api/admin';
import type { AdminListRequest } from 'model/admin.model';

interface AdminListParams {
  page?: number;
  trackName?: AdminListRequest['trackName'];
}

const adminQueries = {
  allKeys: () => ['admin'],

  adminListKeys: (params: AdminListParams) => [...adminQueries.allKeys(), 'list', params],
  adminList: (params: AdminListParams) => queryOptions({
    queryKey: adminQueries.adminListKeys(params),
    queryFn: () => getAdminList({
      page: params.page,
      trackName: params.trackName,
    }),
  }),

  adminInfoKeys: (id: number) => [...adminQueries.allKeys(), id],
  adminInfo: (id: number) => queryOptions({
    queryKey: adminQueries.adminInfoKeys(id),
    queryFn: () => getAdminInfo(id),
  }),
};

export default adminQueries;
