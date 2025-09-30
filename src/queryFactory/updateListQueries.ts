import { queryOptions, skipToken } from '@tanstack/react-query';
import type { UpdateListRequest } from 'model/updateList.model';
import getUpdateList from 'api/updateList';

const updateListQueries = {
  allKeys: () => ['updateList'],

  listKeys: (params: UpdateListRequest) => [...updateListQueries.allKeys(), 'list', { params }],
  list: (params?: UpdateListRequest) => queryOptions({
    queryKey: params ? updateListQueries.listKeys(params) : ['updateList', 'list', 'NO_PARAMS'],
    queryFn: params ? () => getUpdateList(params) : skipToken,
  }),
};

export default updateListQueries;
