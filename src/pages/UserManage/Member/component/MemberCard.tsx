import { MemberTableHead } from 'model/member.model';
import { useNavigate } from 'react-router-dom';
import * as S from './MemberCard.style';

export default function MemberCard({ member }: { member: MemberTableHead }) {
  const navigate = useNavigate();

  return (
    <S.Card onClick={() => navigate(`${member.id}`)}>
      <S.ProfileCover>
        <S.ProfileImg position={member.position} src="https://static.koreatech.in/bcsdlab_page_assets/img/people/sjr.jpg" />
      </S.ProfileCover>
      <S.Position position={member.position}>{member.position}</S.Position>
      <S.UserName>{member.name}</S.UserName>
      <S.StudentNumberLabel>Student No.</S.StudentNumberLabel>
      <S.Description>2019136133</S.Description>
      <S.Label>Email</S.Label>
      <S.Description>{member.email}</S.Description>
    </S.Card>
  );
}
