import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetOwnerListQuery } from 'store/api/owner';
import * as S from './OwnerList.style';

function ManagerRequest() {
  const [page, setPage] = useState(1);
  const { data: ownersRes } = useGetOwnerListQuery({ page });
  console.log('ownersRe', ownersRes);
  const hasTableValue = ownersRes && ownersRes.ownerList.length !== 0;

  return (
    <S.Container>
      <S.Heading>사장님 권한 요청 목록</S.Heading>
      {hasTableValue ? (
        <CustomTable
          data={ownersRes.ownerList}
          pagination={{
            current: page,
            onChange: setPage,
            total: ownersRes.totalPage,
          }}
          columnSize={[10, 25, 15, 25, 25]}
        />
      ) : (<div>값이 없습니다.</div>)}
    </S.Container>
  );
}

export default ManagerRequest;
