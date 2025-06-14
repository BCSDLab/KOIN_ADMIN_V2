import { Col, Divider } from 'antd';
import { useGetPendingClubMutation } from 'store/api/clubRequest';
import { useEffect } from 'react';
import * as S from './RequestInfo.style';

interface RequestInfoProps {
  name: string;
}

function RequestInfoContent({ name }: RequestInfoProps) {
  const [getPendingClub, { data: pendingClubRes }] = useGetPendingClubMutation();

  useEffect(() => {
    if (name) {
      getPendingClub({ club_name: name });
    }
  }, [name, getPendingClub]);

  if (!pendingClubRes) {
    return null;
  }

  return (
    <>
      <S.Title>
        동아리명 :
        {' '}
        {pendingClubRes.name}
      </S.Title>
      <S.Content>
        <S.ClubImage src={pendingClubRes.image_url} alt="club" />
      </S.Content>

      <Divider orientation="left">
        <S.SectionTitle>동아리 관리자</S.SectionTitle>
      </Divider>
      <S.Content>
        직책 :
        {pendingClubRes.role}
      </S.Content>
      <S.Content>
        이름 :
        {pendingClubRes.requester_name}
      </S.Content>
      <S.Content>
        전화번호 :
        {pendingClubRes.requester_phone_number}
      </S.Content>

      <Divider orientation="left">
        <S.SectionTitle>동아리 정보</S.SectionTitle>
      </Divider>
      <Col>
        <S.Content>
          분과 :
          {pendingClubRes.club_category}
        </S.Content>
        <S.Content>
          동아리 방 위치 :
          {pendingClubRes.location}
        </S.Content>
        <S.Content>
          동아리 소개 :
          {pendingClubRes.description}
        </S.Content>
      </Col>

      <Divider orientation="left">
        <S.SectionTitle>연락처</S.SectionTitle>
      </Divider>
      <S.Content>
        인스타그램 :
        {' '}
        <a href={pendingClubRes.instagram} target="_blank" rel="noreferrer">{pendingClubRes.instagram}</a>
      </S.Content>
      <S.Content>
        구글 폼 :
        {' '}
        <a href={pendingClubRes.google_form} target="_blank" rel="noreferrer">{pendingClubRes.google_form}</a>
      </S.Content>
      <S.Content>
        오픈채팅 :
        {' '}
        <a href={pendingClubRes.open_chat} target="_blank" rel="noreferrer">{pendingClubRes.open_chat}</a>
      </S.Content>
      <S.Content>
        대표 전화 :
        {' '}
        {pendingClubRes.phone_number}
      </S.Content>
    </>
  );
}

export default function RequestInfo({ name }: RequestInfoProps) {
  return <RequestInfoContent name={name} />;
}
