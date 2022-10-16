import CustomTable from 'components/common/CustomTable';
import { useGetUserListQuery } from 'store/api/user';
import * as S from './User.style';

function User() {
  const { data: usersRes } = useGetUserListQuery(1);

  return (
    <S.Container>
      <S.Heading>
        User
      </S.Heading>
      {usersRes && <CustomTable tableData={usersRes.userList} />}
      {usersRes?.totalPage}
    </S.Container>
  );
}

export default User;
