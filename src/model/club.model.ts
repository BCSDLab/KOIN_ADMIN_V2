import { ListPagination } from './common.model';

export interface Club {
  id: number;
  name: string;
  image_url: string;
  club_managers: ClubManager[];
  club_category_name: string;
  likes: number;
  description: string;
  sns_contacts: SnsContact[];
  created_at: string;
  is_active: boolean;
}

export interface ClubManager {
  name: string;
  user_id: string;
  phone_number: string;
}

export interface SnsContact {
  sns_type: string;
  contact: string;
}

export interface ClubTableHead extends Pick<Club, 'id' | 'image_url' | 'club_category_name' | 'created_at'> {
  title: string;
  club_manager: string;
  is_active: boolean;
}

export interface ClubResponse extends ListPagination {
  clubs: ClubTableHead[];
}

export interface ClubRequest {
  name: string;
  image_url: string;
  club_managers: { user_id: string }[];
  club_category_id: number;
  location: string;
  description: string;
  instagram: string;
  google_form: string;
  open_chat: string;
  phone_number: string;
}

export interface ClubUpdateRequest extends ClubRequest {
  id: number;
}

export interface ClubFormValues extends Omit<ClubRequest, 'club_managers'> {
  user_id: string;
}

export interface ClubUpdateFormValues extends Omit<ClubUpdateRequest, 'club_managers'> {
  user_id: string;
}

export interface ClubCategory {
  id: number;
  name: string;
}

export interface ClubCategoryResponse {
  club_categories: ClubCategory[];
}

export interface ClubParams {
  page: number;
  club_category_id: number | undefined;
}
