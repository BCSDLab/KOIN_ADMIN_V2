import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomTable from 'components/common/CustomTable';
import { useGetStoreListQuery } from 'store/api/store';
import useBooleanState from 'utils/hooks/useBoolean';
import * as S from './StoreList.style';

function StoreList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { value: isDeletedStore, changeValue: containIsDeletedStore } = useBooleanState(false);
  const { data: StoreRes } = useGetStoreListQuery({
    page,
    is_deleted: isDeletedStore,
  });

  return (
    <S.Container>
      <S.Heading>주변 상점 목록</S.Heading>
      <S.ModalWrap>
        <Flex justify="end">
          <Button
            icon={<PlusOutlined />}
            onClick={() => navigate('/store/write')}
          >
            생성
          </Button>
        </Flex>
      </S.ModalWrap>
      <S.SwitchWrapper>
        <Switch
          onClick={containIsDeletedStore}
          checked={isDeletedStore}
          checkedChildren="trash"
          unCheckedChildren="trash"
        />
      </S.SwitchWrapper>
      {StoreRes && (
        <CustomTable
          data={StoreRes.shops}
          pagination={{
            current: page,
            onChange: setPage,
            total: StoreRes.total_page,
          }}
          columnSize={[10, 20, 20, 20, 10]}
        />
      )}
    </S.Container>
  );
}

export default StoreList;
