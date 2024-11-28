export interface User {
  gender: number;
  credentialsNonExpired: boolean;
  is_graduated: boolean;
  enabled: true,
  anonymous_nickname: string;
  email: string;
  identity: number;
  name: string;
  nickname: string;
  accountNonExpired: boolean;
  phone_number: string;
  id: number;
  accountNonLocked: boolean;
  username: string;
  token: string;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
}

export interface LoginState {
  token: string | null;
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AdminInfo {
  id: number;
  email: string;
  name: string;
  track_name: string;
  team_name: string;
  can_create_admin: boolean;
  super_admin: boolean;
}

export interface ChangePasswordRequest {
  old_password: string,
  new_password: string,
}
