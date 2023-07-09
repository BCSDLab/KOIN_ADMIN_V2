import { ListPagination } from './common.model';

// export interface Owner {
//   id: number;
//   created_at: string;
//   email: string;
//   name: string;
// }

export interface OwnerDetailForm extends OwnerResponse {
  category_ids: number[];
}
export interface OwnersResponse extends ListPagination {
  owners: OwnerTableHead[];
}

export interface OwnersParam {
  page: number;
}

export interface OwnerTableHead {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone_number: string;
  shop_id: number;
  shop_name: string;
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
  ast_logged_at: string;
  created_at: string;
  updated_at: string;
  company_registration_number: string;
  attachments_id: number[] | null;
  shops_id: number[] | null;
}
