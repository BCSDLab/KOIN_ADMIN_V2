/**
 * @param {number} identity 0: 학생, 1: 대학원생, 2: 교수, 3: 교직원, 4: 졸업생, 5: 점주
 * @param {number} gender 0: 남자, 1: 여자
 * @param {boolean} is_authed 이메일인증 완료여부
 */
export interface UserDetail {
  id: number;
  portal_account: string;
  nickname: string | null;
  name: string | null;
  student_number: string | null;
  major: string | null;
  phone_number: string | null;
  identity: number;
  gender: 0 | 1;
  is_authed: boolean;
  last_logged_at: string;

  // 없어져야 할 프로퍼티들
  // remember_token: boolean; // ??
  // authority: null; // ??
  // authorities: null, // ??
  // enabled: boolean; // ??
  // password: string; // 얘는 주면 안될듯하네요
  // anonymous_nickname: string; // 게시판 사라졌으니 불필요
  // username: string; // name이 있는데 정체를 모르겠네요
  // profile_image_url: null | string; // 프사없으니 불필요?
  // is_graduated: boolean; // 졸업 계산 방법이 없을테다가 사용할곳이 없으니..
  // auth_token: boolean; // 로그인 시 제공
  // auth_expired_at: boolean; // 유저정보와 관련 없음
  // reset_token: null; // 없음
  // reset_expired_at: null; // 없음
  // accountNonExpired: null; // 없음
  // accountNonLocked: boolean; // LOCK 기능이 생긴다면 있어도 될 것 같네요
  // credentialsNonExpired: boolean; // ??
}

/**
 * @param {number} identity 0: 학생, 1: 대학원생, 2: 교수, 3: 교직원, 4: 졸업생, 5: 점주
 */
export interface UserTableHead {
  id: number;
  portal_account: string;
  nickname: string;
  name: string | null;
  major: string | null;
  student_number: string | null;
}

export interface UsersResponse {
  totalPage: number;
  users: UserListData[];
}

export interface UserListData {
  id: number;
  portal_account: string;
  nickname: string;
  name: string | null;
  major: string | null;
  student_number: string | null;
}
