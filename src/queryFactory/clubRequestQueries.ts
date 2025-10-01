import { queryOptions } from '@tanstack/react-query';
import {
  getPendingClubList,
  getAcceptedClubList,
} from 'api/clubRequest';
import type { ClubListParams } from 'model/clubRequest.model';

const clubRequestQueries = {
  allKey: () => ['clubRequest'] as const,

  pendingList: (params: ClubListParams) => queryOptions({
    queryKey: [...clubRequestQueries.allKey(), 'pendingList', params],
    queryFn: () => getPendingClubList(params),
  }),

  acceptedList: (params: ClubListParams) => queryOptions({
    queryKey: [...clubRequestQueries.allKey(), 'acceptedList', params],
    queryFn: () => getAcceptedClubList(params),
  }),
};

export default clubRequestQueries;
