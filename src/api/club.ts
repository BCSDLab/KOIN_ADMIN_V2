import type {
  Club, ClubCategoryResponse, ClubParams, ClubRequest, ClubResponse,
} from 'model/club.model';
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

export const getClubCategoryList = async (): Promise<ClubCategoryResponse> => {
  const res = await accessClient.get<ClubCategoryResponse>('/admin/clubs/categories');
  return res.data;
};

export const postClub = async (body: Partial<ClubRequest>): Promise<ClubRequest> => {
  const res = await accessClient.post<ClubRequest>('/admin/clubs', body);
  return res.data;
};

export const putClub = async (
  params: Pick<Club, 'id'> & Partial<ClubRequest>,
): Promise<void> => {
  const { id, ...body } = params;
  await accessClient.put(`/admin/clubs/${id}`, body);
};

export const toggleClub = async (params: {
  id: number;
  body: { is_active: boolean };
}): Promise<void> => {
  await accessClient.patch(`/admin/clubs/${params.id}/active`, params.body);
};
