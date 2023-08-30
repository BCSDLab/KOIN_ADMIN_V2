import { ListPagination } from './common.model';

/**
 * @param {number} gender 0: 남자, 1: 여자
 * @param {boolean} is_authed 이메일인증 완료여부
 */
export interface UserDetail {
  id: number;
  email: string;
  nickname: string | null;
  name: string | null;
  student_number: string | null;
  major: string | null;
  phone_number: string | null;
  gender: 0 | 1;
  is_authed: boolean;
  is_deleted: boolean;
  last_logged_at: string;
  user_type: 'STUDENT' | 'OWNER' | 'ADMIN';
  created_at: string;
  updated_at: string;

  // Response로 오지만 쓰지 않는 프로퍼티들
  // anonymous_nickname: string;
  // is_graduated: boolean;
}

export interface UserTableHead {
  id: number;
  email: string;
  nickname: string;
  name: string | null;
  major: string | null;
  student_number: string | null;
}

export interface UsersResponse extends ListPagination {
  students: UserListData[];
}

export interface UserListData {
  id: number;
  email: string;
  nickname: string;
  name: string | null;
  major: string | null;
  student_number: string | null;
}
