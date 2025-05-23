import { Col, Divider, Flex } from 'antd';
import * as S from './RequestInfo.style';

const mockData = {
  name: 'BCSD',
  requester_phone_number: '01012345678',
  club_category: '학술',
  location: '학생식당 건물 406호',
  image_url: 'https://placehold.co/600x400',
  description: '즐겁게 일하고 열심히 노는 IT 특성화 동아리',
  instagram: 'https://www.instagram.com/bcsdlab/',
  google_form: 'https://forms.gle/example',
  open_chat: 'https://open.kakao.com/example',
  phone_number: '01098765432',
};

export default function RequestInfo() {
  return (
    <>
      <S.Title>
        동아리명 :
        {' '}
        {mockData.name}
      </S.Title>
      <Divider orientation="left">
        <S.SectionTitle>
          동아리 관리자
        </S.SectionTitle>
      </Divider>
      <S.Content>
        이름 : api에서 안 주는건가
      </S.Content>
      <S.Content>
        전화번호 :
        {mockData.requester_phone_number}
      </S.Content>
      <Divider orientation="left">
        <S.SectionTitle>
          동아리 정보
        </S.SectionTitle>
      </Divider>
      <Flex justify="start" gap={50}>
        <Col>
          <S.Content>
            분과 :
            {mockData.club_category}
          </S.Content>
          <S.Content>
            동아리 방 위치 :
            {mockData.location}
          </S.Content>
          <S.Content>
            동아리 소개 :
            {mockData.description}
          </S.Content>
        </Col>
        <S.Content>
          <img src={mockData.image_url} alt="club" style={{ width: 200, height: 'auto' }} />
        </S.Content>
      </Flex>
      <Divider orientation="left">
        <S.SectionTitle>
          연락처
        </S.SectionTitle>
      </Divider>

      <S.Content>
        인스타그램 :
        {' '}
        <a href={mockData.instagram} target="_blank" rel="noreferrer">{mockData.instagram}</a>
      </S.Content>
      <S.Content>
        구글 폼 :
        {' '}
        <a href={mockData.google_form} target="_blank" rel="noreferrer">{mockData.google_form}</a>
      </S.Content>
      <S.Content>
        오픈채팅 :
        {' '}
        <a href={mockData.open_chat} target="_blank" rel="noreferrer">{mockData.open_chat}</a>
      </S.Content>
      <S.Content>
        대표 전화 :
        {mockData.phone_number}
      </S.Content>
    </>
  );
}
