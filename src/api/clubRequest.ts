import accessClient from 'api';
import type { ClubListParams, PendingClubResponse, PendingClub } from 'model/clubRequest.model';

export const getPendingClubList = async (params: ClubListParams) => {
  const res = await accessClient.get<PendingClubResponse>('/admin/clubs/pending', {
    params: {
      page: params.page,
      limit: params.limit,
      sort: params.sort,
    },
  });

  return res.data;
};

export const getAcceptedClubList = async (params: ClubListParams) => {
  const res = await accessClient.get<PendingClubResponse>('/admin/clubs/managers', {
    params: {
      page: params.page,
      limit: params.limit,
      sort: params.sort,
    },
  });

  return res.data;
};

export const createPendingClub = async (body: { club_name: string }) => {
  const res = await accessClient.post<PendingClub>('/admin/clubs/pending', body);

  return res.data;
};

export const decidePendingClub = async (body: { club_name: string; is_accept: boolean }) => {
  await accessClient.post('/admin/clubs/decision', body);
};
