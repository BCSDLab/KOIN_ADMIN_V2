import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetOwnerListQuery } from 'store/api/owner';

import * as S from './OwnerList.style';

function OwnerList() {
  const [page, setPage] = useState(1);
  const { data: ownersRes } = useGetOwnerListQuery({ page });

  return (
    <S.Container>
      <S.Heading>사장님 목록</S.Heading>
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

export default OwnerList;
