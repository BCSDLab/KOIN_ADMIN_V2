import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetUserListQuery } from 'store/api/user';
import * as S from './UserList.style';

function UserList() {
  const [page, setPage] = useState(1);
  const { data: usersRes } = useGetUserListQuery(page);

  return (
    <S.Container>
      <S.Heading>User</S.Heading>
      {usersRes && (
        <CustomTable
          data={usersRes.userList}
          pagination={{
            current: page,
            onChange: setPage,
            total: usersRes.totalPage,
          }}
          columnSize={[10, 20, 20, 15, 20, 15]}
        />
      )}
    </S.Container>
  );
}

export default UserList;
