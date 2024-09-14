export interface Test {
  id: number;
  status: 'IN_PROGRESS' | 'COMPLETED' | string;
  winner_name: string;
  creator: string;
  team: string;
  display_title: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface ABTestResponse {
  tests: Test[];
  total_count: number;
  current_count: number;
  total_page: number;
  current_page: number;
}

export interface ABTest {
  display_title: string;
  creator: string;
  team: string;
  title: string;
  description: string;
  variables: {
    rate: number;
    display_name: string;
    name: string;
  }[]
}

export interface NewABTestResponse {
  id: number;
  display_title: string;
  creator: string;
  team: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | string;
  winner_name: string | null;
  title: string;
  description: string;
  variables: {
    rate: number;
    display_name: string;
    name: string;
  }[]
  created_at: string;
  updated_at: string;
}

export interface ModifyABTest {
  id: string | number;
  data: Partial<ABTest>;
}

export interface ABTestUser {
  id: string;
  name: string;
  detail: string;
}

export interface ABTestUsersResponse {
  users: ABTestUser[]
}
export interface ABTestUserUserID {
  id: string | number;
  type: string;
  model: string;
  last_accessed_at: string;
}

export interface ABTestUserUserIDResponse {
  devices: ABTestUserUserID[]
}

export interface ABTestUserMoveRequest {
  id: string | number;
  data: {
    device_id: string | number;
    variable_name: string | number;
  }
}

export interface ABTestWinnerRequest {
  id: string | number | undefined;
  winner_name: string;
}
// 테스트
export interface ABTestAssignRequest {
  title: string;
  access_history_id: number | string | null ;
}

export interface ABTestAssignResponse {
  variable_name: string,
  access_history_id: number
}
