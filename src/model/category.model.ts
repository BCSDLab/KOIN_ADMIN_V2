import { ListPagination } from './common.model';

export interface Category {
  id: number;
  image_url: string;
  name: string;
  parent_category_id: number;
  event_banner_image_url: string;
}

export type CategoriesResponseV2 = Category[];

export interface CategoriesResponse extends ListPagination {
  categories: Category[];
}

export type DropdownCategory = Omit<Category, 'image_url'>;

export type DropdownCategoryResponse = DropdownCategory[];

export interface CategoryOrderRequest {
  shop_category_ids: number[];
}
