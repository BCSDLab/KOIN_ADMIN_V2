import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetOwnerRequestListQuery } from 'store/api/ownerRequest';
import * as S from './OwnerRequestList.style';

function OwnerRequestList() {
  const [page, setPage] = useState(1);
  const { data: ownersRes } = useGetOwnerRequestListQuery({ page });

  return (
    <S.Container>
      <S.Heading>사장님 권한 요청 목록</S.Heading>
      {ownersRes && (
      <CustomTable
        data={ownersRes.owners}
        pagination={{
          current: page,
          onChange: setPage,
          total: ownersRes.totalPage,
        }}
        columnSize={[10, 25, 15, 25, 25]}
      />
      )}
    </S.Container>

  );
}

export default OwnerRequestList;
