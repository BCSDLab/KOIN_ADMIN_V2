// 기본 옵션 (CustomForm.Select용 - 객체 형태)
export const TRACK_OPTIONS = {
  FRONTEND: 'Frontend',
  BACKEND: 'Backend',
  ANDROID: 'Android',
  IOS: 'iOS',
  GAME: 'Game',
  DESIGN: 'Design',
  PM: 'PM',
  PL: 'PL',
  DA: 'DA',
  SECURITY: 'Security',
} as const;

// 필터용 옵션 (antd Select용 - 배열 형태, 전체 옵션 포함)
export const TRACK_FILTER_OPTIONS = [
  { value: '', label: '전체 트랙' },
  ...Object.entries(TRACK_OPTIONS).map(([value, label]) => ({ value, label })),
];
