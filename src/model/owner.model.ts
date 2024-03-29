import { ListPagination } from './common.model';

export interface OwnerDetailForm extends OwnerResponse {
  category_ids: number[];
}
export interface OwnersResponse extends ListPagination {
  owners: Owner[];
}

export interface OwnersParam {
  page: number;
}

export interface Owner {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone_number: string;
  shop_id: number;
  shop_name: string;
}

export interface OwnerRequestTableHeader {
  id: number;
  email: string;
  name: string;
  created_at: string;
  shop_name: string;
}

export interface OwnerRequestListResponse {
  owners: OwnerRequestTableHeader[];
  totalPage: number;
}

export interface OwnerTableHeader {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone_number: string;
}

export interface OwnerListResponse {
  owners: OwnerTableHeader[];
  totalPage: number;
}

enum UserType {
  OWNER = 'OWNER',
  STUDENT = 'STUDENT',
  USER = 'USER',
}

export interface OwnerResponse {
  id: number;
  nickname: string | null;
  name: string;
  phone_number: string | null;
  user_type: UserType;
  email: string;
  gender: string | null;
  is_authed: boolean;
  last_logged_at: string;
  created_at: string;
  updated_at: string;
  company_registration_number: string;
  attachments_id: number[] | null;
  shops_id: number[] | null;
}
