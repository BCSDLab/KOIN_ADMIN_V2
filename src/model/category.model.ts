import { ListPagination } from './common.model';

export interface Category {
  id: number;
  image_url: string;
  name: string;
}

export type CategoriesResponseV2 = Category[];

export interface CategoriesResponse extends ListPagination {
  categories: Category[];
}

export type DropdownCategory = Omit<Category, 'image_url'>;

export type DropdownCategoryResponse = DropdownCategory[];
