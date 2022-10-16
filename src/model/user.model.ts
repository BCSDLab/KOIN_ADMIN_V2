export interface UserDetail {
  id: number; // id
  portal_account: string; // 계정 id
  nickname: string | null; // 닉네임
  name: string | null; // 이름
  student_number: string | null; // 학번
  major: string | null; // 학과
  phone_number: string | null; // 전화번호
  identity: number; // 0: 학생, 1: 대학원생, 2: 교수, 3: 교직원, 4: 졸업생, 5: 점주
  gender: 0 | 1; // 0: 남자, 1: 여자
  is_authed: boolean; // 이메일인증 완료여부
  last_logged_at: string;

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

export interface UserTableHead {
  key: number | string;
  id: number;
  portal_account: string; // 계정 id
  identity: number; // 0: 학생, 1: 대학원생, 2: 교수, 3: 교직원, 4: 졸업생, 5: 점주
  nickname: string | null; // 닉네임
  name: string | null; // 이름
}

export interface UsersResponse {
  totalPage: number;
  items: UserDetail[];
}
