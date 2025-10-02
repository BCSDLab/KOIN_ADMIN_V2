import accessClient from 'api';
import type {
  Banner, BannerParams, BannerPriorityParams, BannerRequest, BannersResponse,
} from 'model/banner.model';

export const getBannerList = async ({ page, is_active, banner_category_name }: BannerParams) => {
  const { data } = await accessClient.get<BannersResponse>('admin/banners', {
    params: {
      page,
      is_active,
      banner_category_name,
    },
  });
  return data;
};

export const getBanner = async ({ id }: { id: number }) => {
  const { data } = await accessClient.get(`admin/banners/${id}`);
  return data;
};

export const addBanner = async (body: Partial<Banner>) => {
  const { data } = await accessClient.post<Partial<Banner>>('admin/banners', body);
  return data;
};

export const updateBanner = async ({ id, ...body }: { id: number }) => {
  const { data } = await accessClient.put<Pick<Banner, 'id'> & Partial<BannerRequest>>(`admin/banners/${id}`, body);
  return data;
};

export const deleteBanner = async ({ id }: { id: number }) => {
  const { data } = await accessClient.delete<{ success: boolean; id: number }>(`admin/banners/${id}`);
  return data;
};

export const updateBannerPriority = async (
  { id, body }: { id: number, body: BannerPriorityParams },
) => {
  const { data } = await accessClient.patch<void>(`admin/banners/${id}/priority`, body);
  return data;
};

export const toggleBannerActive = async (
  { id, body }: { id: number; body: { is_active: boolean } },
) => {
  const { data } = await accessClient.patch<void>(`admin/banners/${id}/active`, body);
  return data;
};
