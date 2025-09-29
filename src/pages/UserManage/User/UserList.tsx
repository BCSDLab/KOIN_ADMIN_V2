import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import userQueries from 'queryFactory/userQueries';
import * as S from './UserList.style';

function UserList() {
  const [page, setPage] = useState(1);
  const { data: usersRes } = useQuery(userQueries.userList(page));

  return (
    <S.Container>
      <S.Heading>코인 회원 목록</S.Heading>
      {usersRes && (
        <CustomTable
          data={usersRes.students}
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
