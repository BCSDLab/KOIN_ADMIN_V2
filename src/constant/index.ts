export const API_PATH = process.env.REACT_APP_API_PATH;

export const KOIN_URL = process.env.REACT_APP_API_PATH?.includes('stage') ? 'https://stage.koreatech.in' : 'https://koreatech.in';

// 테이블 헤더 Title 매핑
export const TITLE_MAPPER: Record<string, string> = {
  id: 'ID',
  name: '이름',
  email: '이메일',
  identity: '유저 구분',
  nickname: '닉네임',
  monthly_fee: '월세',
  charter_fee: '전세',
  room_type: '방 종류',
  management_fee: '관리비',
  size: '평수',
  major: '학과',
  student_number: '학번',
  category_names: '카테고리',
  phone: '번호',
  phone_number: '번호',
  shop_name: '상점명',
  shop_id: '상점 ID',
  image_url: '이미지',
  post_number: '글번호',
  title: '제목',
  author: '작성자',
  post_date: '게시일',
  updatedAt: 'date',
};
