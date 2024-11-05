export type AppType = 'android' | 'ios';

export interface AppVersionResponse {
  id: number,
  type: AppType,
  version: string,
  title: string,
  content: string,
  created_at: string,
  updated_at: string,
}
