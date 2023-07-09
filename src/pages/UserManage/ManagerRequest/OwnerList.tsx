import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetOwnerListQuery } from 'store/api/owner';
import * as S from './OwnerList.style';

function ManagerRequest() {
  const [page, setPage] = useState(1);
  const { data: ownersRes } = useGetOwnerListQuery({ page });
  return (
    <S.Container>
      <S.Heading>사장님 권한 요청 목록</S.Heading>

      {ownersRes && (
      <CustomTable
        data={ownersRes.ownerList}
        pagination={{
          current: page,
          onChange: setPage,
          total: ownersRes.totalPage,
        }}
        columnSize={[7, 20, 10, 20, 10, 18, 15]}
      />
      )}
    </S.Container>
  );
}

export default ManagerRequest;
