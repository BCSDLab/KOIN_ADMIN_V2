export interface User {
  gender: number;
  credentialsNonExpired: boolean;
  is_graduated: boolean;
  enabled: true,
  anonymous_nickname: string;
  portal_account: string;
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
  user: User | null
  token: string | null
}

export interface LoginRequest {
  portal_account: string
  password: string
}
