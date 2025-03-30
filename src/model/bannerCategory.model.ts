export interface BannerCategory {
  id: number;
  name: string;
  description: string;
}

export type BannerCategoriesResponse = {
  banner_categories: BannerCategory[];
};

export interface BannerCategoryUpdateForm {
  id: number;
  description: string;
}
