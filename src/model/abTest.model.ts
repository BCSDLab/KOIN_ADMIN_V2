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

export interface NewABTest {
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
