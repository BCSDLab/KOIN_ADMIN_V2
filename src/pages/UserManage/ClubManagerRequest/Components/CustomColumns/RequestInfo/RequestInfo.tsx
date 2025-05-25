import { Col, Divider, Flex } from 'antd';
import { useGetPendingClubQuery } from 'store/api/clubRequest';
import * as S from './RequestInfo.style';

interface RequestInfoProps {
  name: string;
}

export default function RequestInfo({ name }: RequestInfoProps) {
  const { data: PendingClubRes } = useGetPendingClubQuery(name);

  if (!PendingClubRes) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <S.Title>
        동아리명 :
        {' '}
        {PendingClubRes.name}
      </S.Title>
      <Divider orientation="left">
        <S.SectionTitle>
          동아리 관리자
        </S.SectionTitle>
      </Divider>
      <S.Content>
        직책 :
        {' '}
        {PendingClubRes.role}
      </S.Content>
      <S.Content>
        이름 :
        {' '}
        {PendingClubRes.requester_name}
      </S.Content>
      <S.Content>
        전화번호 :
        {' '}
        {PendingClubRes.requester_phone_number}
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
            {' '}
            {PendingClubRes.club_category}
          </S.Content>
          <S.Content>
            동아리 방 위치 :
            {' '}
            {PendingClubRes.location}
          </S.Content>
          <S.Content>
            동아리 소개 :
            {' '}
            {PendingClubRes.description}
          </S.Content>
        </Col>
        <S.Content>
          <img src={PendingClubRes.image_url} alt="club" style={{ width: 400, height: 'auto' }} />
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
        <a href={PendingClubRes.instagram} target="_blank" rel="noreferrer">{PendingClubRes.instagram}</a>
      </S.Content>
      <S.Content>
        구글 폼 :
        {' '}
        <a href={PendingClubRes.google_form} target="_blank" rel="noreferrer">{PendingClubRes.google_form}</a>
      </S.Content>
      <S.Content>
        오픈채팅 :
        {' '}
        <a href={PendingClubRes.open_chat} target="_blank" rel="noreferrer">{PendingClubRes.open_chat}</a>
      </S.Content>
      <S.Content>
        대표 전화 :
        {' '}
        {PendingClubRes.phone_number}
      </S.Content>
    </>
  );
}
