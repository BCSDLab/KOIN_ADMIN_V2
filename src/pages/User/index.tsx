import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetUserListQuery } from 'store/api/user';
import * as S from './User.style';

function User() {
  const [page, setPage] = useState(1);
  const { data: usersRes } = useGetUserListQuery(page);

  return (
    <S.Container>
      <S.Heading>
        User
      </S.Heading>
      {usersRes && (
        <CustomTable
          tableData={usersRes.userList}
          currentPage={page}
          handlePageChange={setPage}
          totalPage={usersRes.totalPage}
        />
      )}
    </S.Container>
  );
}

export default User;
