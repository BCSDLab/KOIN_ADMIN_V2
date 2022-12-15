export const API_PATH = process.env.REACT_APP_API_PATH;

export const SECOND_PASSWORD = process.env.REACT_APP_SECOND_PASSWORD;

// 테이블 헤더 Title 매핑
export const TITLE_MAPPER: Record<string, string> = {
  id: 'ID',
  name: '이름',
  portal_account: '아우누리 ID',
  identity: '유저 구분',
  nickname: '닉네임',
  monthly_fee: '월세',
  charter_fee: '전세',
  room_type: '방 종류',
  management_fee: '관리비',
  size: '평수',
  major: '학과',
  student_number: '학번',
};
