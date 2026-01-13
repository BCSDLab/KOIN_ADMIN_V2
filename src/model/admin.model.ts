export type TrackType = 'FRONTEND' | 'BACKEND' | 'DESIGN' | 'ANDROID' | 'IOS' | 'GAME' | 'PM' | 'PL' | 'DA' | 'SECURITY';
export type TeamType = 'BUSINESS' | 'USER' | 'CAMPUS' | 'KOIN';

export interface Admin {
  id: number;
  email: string;
  name: string;
  track_name: string;
  team_name: string;
  can_create_admin: boolean;
  super_admin: boolean;
}

export interface AdminListRequest {
  page?: number;
  limit?: number;
  isAuthed?: boolean;
  trackName?: TrackType;
  teamName?: TeamType;
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
  track_type: string;
  team_type: string;
}
