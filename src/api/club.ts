import type { Club, ClubParams, ClubResponse } from 'model/club.model';
import accessClient from './index';

export const getClub = async (id: number) => {
  const res = await accessClient.get<Club>(`admin/clubs/${id}`);

  return res.data;
};

export const getClubList = async (params: ClubParams): Promise<ClubResponse> => {
  const res = await accessClient.get<ClubResponse>('/admin/clubs', {
    params: {
      page: params.page,
      club_category_id: params.club_category_id,
    },
  });
  return res.data;
};
