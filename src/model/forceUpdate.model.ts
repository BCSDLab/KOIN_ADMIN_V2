export type OS = 'android' | 'ios';

export interface UpdateAppVersionRequest {
  type: OS;
  version: string;
  title: string;
  content: string;
}

export interface AppVersionResponse {
  id: number;
  type: OS;
  version: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}
