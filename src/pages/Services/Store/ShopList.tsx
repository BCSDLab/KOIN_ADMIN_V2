import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CustomTable from 'components/common/CustomTable';
import { useQuery } from '@tanstack/react-query';
import useBooleanState from 'utils/hooks/useBoolean';
import shopQueries from 'queryFactory/shopQueries';
import * as S from './ShopList.style';

function ShopList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { value: isDeletedShop, changeValue: containIsDeletedShop } = useBooleanState(false);

  const { data: ShopRes } = useQuery(shopQueries.list({ page, is_deleted: isDeletedShop }));

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
          onClick={containIsDeletedShop}
          checked={isDeletedShop}
          checkedChildren="deleted"
          unCheckedChildren="existing"
        />
      </S.SwitchWrapper>
      {ShopRes && (
        <CustomTable
          data={ShopRes.shops}
          pagination={{
            current: page,
            onChange: setPage,
            total: ShopRes.total_page,
          }}
          columnSize={[20, 10, 20, 20]}
          hiddenColumns={['is_deleted']}
        />
      )}
    </S.Container>
  );
}

export default ShopList;
