import { ListPagination } from './common.model';

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
  title: string;
  content: string;
}

export interface DeleteNoticeResponse {
  success: boolean;
  id: number;
}
