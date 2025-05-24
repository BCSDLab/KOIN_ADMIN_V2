import { ListPagination } from './common.model';

export interface PendingClubTableHead {
  club_id: number;
  club_manager_name: string;
  phone_number: string;
  created_at: string;
  club_name: string;
}

export interface PendingClubResponse extends ListPagination {
  clubs: PendingClubTableHead[];
}

export interface PendingClub {
  name: string;
  requester_phone_number: string;
  requester_name: string;
  club_category: string;
  location: string;
  image_url: string;
  description: string;
  instagram: string;
  google_form: string;
  open_chat: string;
  phone_number: string;
}

export interface ClubListParams {
  page: number;
  limit?: number;
  sort?: 'CREATED_AT_ASC' | 'CREATED_AT_DESC';
}
