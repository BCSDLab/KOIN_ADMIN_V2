import { ListPagination } from './common.model';

export interface Member {
  id: number;
  name: string;
  track: Track;
  position: Position;
  email: string;
  image_url: string;
  student_number: string;
  is_deleted: boolean;
}

export type Track = 'FrontEnd' | 'BackEnd' | 'Android' | 'Game' | 'UI/UX';
export type TrackForParam = 'FRONTEND' | 'BACKEND' | 'ANDROID' | 'GAME' | 'UI_UX';
export type Position = 'Regular' | 'Mentor';

export interface MembersResponse extends ListPagination {
  members: Member[]
}

export interface MembersParam {
  page: number;
  track: TrackForParam;
}

export interface MemberTableHead {
  id: number;
  name: string;
  track: Track;
  position: Position;
  image_url: string;
  email: string;
}
