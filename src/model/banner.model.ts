import { ListPagination } from './common.model';

export interface Banner {
  id: number;
  banner_category_id: number;
  banner_category: string;
  priority: number | null;
  title: string;
  image_url: string;
  is_web_released: boolean;
  web_redirect_link: string | null;
  is_android_released: boolean;
  android_redirect_link: string | null;
  android_minimum_version: string | null;
  is_ios_released: boolean;
  ios_redirect_link: string | null;
  ios_minimum_version: string | null;
  is_active: boolean;
  created_at: string;
}

export interface BannersResponse extends ListPagination {
  banners: Banner[];
}

export interface BannerRequest {
  banner_category_id: number;
  title: string;
  image_url: string;
  web_redirect_link: string | null;
  is_web_released: boolean;
  is_android_released: boolean;
  android_redirect_link: string | null;
  android_minimum_version: string | null;
  is_ios_released: boolean;
  ios_redirect_link: string | null;
  ios_minimum_version: string | null;
  is_active: boolean;
}

export interface BannerUpdateRequest extends BannerRequest {
  id: number;
}

export interface BannerFormValues extends BannerRequest {
  banner_category: string;
}

export interface BannerUpdateFormValues extends BannerUpdateRequest {
  banner_category: string;
}

export interface RedirectLink {
  web: string | null;
  android: string | null;
  ios: string | null;
}

export interface BannerTableHead {
  id: number;
  title: string;
  image_url: string;
  redirect_link: RedirectLink;
  created_at: string;
  is_active: boolean;
  priority: number | null;
}

export interface BannerTransformResponse extends ListPagination {
  banners: BannerTableHead[];
}

export interface BannerParams {
  page: number;
  banner_category_name: string;
  is_active?: boolean;
}

export type BannerPriorityParams = {
  change_type: 'UP' | 'DOWN';
};
