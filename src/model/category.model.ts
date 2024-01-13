import { ListPagination } from './common.model';

export interface Category {
  id: number;
  image_url: string;
  name: string;
}

export interface CategoriesResponse extends ListPagination {
  categories: Category[];
}
