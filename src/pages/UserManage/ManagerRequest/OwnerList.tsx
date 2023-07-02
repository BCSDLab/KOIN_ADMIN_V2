import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetOwnerListQuery } from 'store/api/owner';
// import useBooleanState from 'utils/hooks/useBoolean';
// import { Switch } from 'antd';
import * as S from './OwnerList.style';

function ManagerRequest() {
  const [page, setPage] = useState(1);
  // const { value: isDeleted, changeValue: handleDeleted } = useBooleanState(false);
  const { data: ownersRes } = useGetOwnerListQuery({ page });
  return (
    <S.Container>
      <S.Heading>사장님 권한 요청 목록</S.Heading>
      {/* <S.SwitchWrapper>
        <Switch
          onClick={handleDeleted}
          checked={isDeleted}
          checkedChildren="trash"
          unCheckedChildren="trash"
        />
      </S.SwitchWrapper> */}
      {ownersRes && (
      <CustomTable
        data={ownersRes.ownerList}
        pagination={{
          current: page,
          onChange: setPage,
          total: ownersRes.totalPage,
        }}
        columnSize={[20, 40, 20, 20]}
      />
      )}
    </S.Container>
  );
}

export default ManagerRequest;
