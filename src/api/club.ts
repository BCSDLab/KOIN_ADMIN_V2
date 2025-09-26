import type { Club, ClubParams, ClubResponse } from 'model/club.model';
import accessClient from './index';

export const getClub = async (id: number) => {
  const res = await accessClient.get<Club>(`admin/clubs/${id}`);

  return res.data;
};

export const getClubList = async (params: ClubParams): Promise<ClubResponse> => {
  const searchParams = new URLSearchParams({ page: String(params.page) });
  if (params.club_category_id) {
    searchParams.append('club_category_id', String(params.club_category_id));
  }

  const res = await accessClient.get<ClubResponse>(`/admin/clubs?${searchParams.toString()}`);
  return res.data;
};
