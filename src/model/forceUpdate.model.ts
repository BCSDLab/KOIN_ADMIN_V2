export type VersionType = 'android' | 'ios';

export interface AppVersionResponse {
  id: number,
  type: string,
  version: VersionType,
  title: string,
  content: string,
  created_at: string,
  updated_at: string,
}
