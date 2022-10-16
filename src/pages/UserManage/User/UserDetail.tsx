import { useParams } from 'react-router-dom';
import * as S from './UserDetail.style';

function UserDetail() {
  const { id } = useParams();
  return (
    <S.Container>
      <S.Heading>
        User:
        {id}
      </S.Heading>
    </S.Container>
  );
}

export default UserDetail;
