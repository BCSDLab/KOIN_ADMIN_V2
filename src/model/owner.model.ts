import { ListPagination } from './common.model';

export interface Owner {
  id: number;
  created_at: string;
  email: string;
  name: string;
}

export interface OwnersResponse extends ListPagination {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  owners: Owner[];
}

export interface OwnersParam {
  page: number;
}

export interface OwnerTableHead {
  id: number;
  created_at: string;
  email: string;
  name: string;
}
