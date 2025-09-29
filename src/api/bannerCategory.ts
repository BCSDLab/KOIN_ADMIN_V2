import accessClient from 'api';
import { BannerCategoriesResponse, BannerCategory } from 'model/bannerCategory.model';

export const getBannerCategoryList = async () => {
  const { data } = await accessClient.get<BannerCategoriesResponse>('admin/banner-categories');

  return data;
};

export const updateBannerCategoryDescription = async ({ id, ...body }: Partial<BannerCategory>) => {
  const { data } = await accessClient.patch<BannerCategory>(`admin/banner-categories/${id}`, body);

  return data;
};
