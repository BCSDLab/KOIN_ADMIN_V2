import { ListPagination } from './common.model';

export interface Category {
  id: 0;
  image_url: string;
  name: string;
}

export interface CategoriesResponse extends ListPagination {
  categories: Category[];
}
