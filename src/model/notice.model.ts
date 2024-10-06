import { ListPagination } from './common.model';

export interface OwnerDetailForm extends OwnerResponse {
  category_ids: number[];
}

export interface NoticesResponse extends ListPagination {
  notices: Notice[];
}

export interface TransformedNoticesResponse {
  notices: TransformedNotice[];
  total_page: number;
}

export interface NoticesParam {
  page: number;
  is_deleted: boolean;
}

export interface Notice {
  id: number;
  title: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface NoticeResponse extends Notice {
  content: string;
}

export interface TransformedNotice {
  id: number;
  post_number: number;
  title: string;
  author: string;
  post_date: string;
}

export interface NoticeRequest {
  title: string;
  content: string;
}

export interface NoticeUpdateForm {
  id: number;
  titme: string;
  contents: string;
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
