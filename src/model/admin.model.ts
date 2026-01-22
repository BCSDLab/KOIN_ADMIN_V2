export type TrackType = 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'ANDROID' | 'IOS' | 'GAME' | 'PM' | 'PL' | 'DA' | 'SECURITY';
export type TeamType = 'BUSINESS' | 'USER' | 'CAMPUS' | 'KOIN';

export interface Admin {
  id: number;
  email: string;
  name: string;
  track_name: string;
  super_admin: boolean;
  is_authed: boolean;
}

export interface AdminListRequest {
  page?: number;
  limit?: number;
  isAuthed?: boolean;
  trackName?: TrackType;
}

export interface AdminListResponse {
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
  admins: Admin[];
}

export interface SignUpAdminRequest {
  email: string;
  password: string;
  name: string;
  track_name: string;
}

export interface ChangeAdminAuthedRequest {
  is_authed: boolean;
}
