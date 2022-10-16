import CustomTable from 'components/common/CustomTable';
import { useGetUserListQuery } from 'store/api/user';
import * as S from './User.style';

function User() {
  const { data } = useGetUserListQuery(1);

  return (
    <S.Container>
      <S.Heading>
        User
      </S.Heading>
      {data && <CustomTable tableData={data} />}
    </S.Container>
  );
}

export default User;
