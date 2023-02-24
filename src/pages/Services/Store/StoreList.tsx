import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetStoreListQuery } from 'store/api/store';
import CustomForm from 'components/common/CustomForm';
import useBooleanState from 'utils/hooks/useBoolean';
import { Switch } from 'antd';
import * as S from './StoreList.style';

function StoreList() {
  const [page, setPage] = useState(1);
  const { setTrue: openModal, value: isModalOpen, setFalse: closeModal } = useBooleanState();
  const { value: isDeleted, changeValue: handleDeleted } = useBooleanState(false);
  const { data: StoreRes } = useGetStoreListQuery({
    page,
    is_deleted: isDeleted,
  });

  return (
    <S.Container>
      <S.Heading>Store</S.Heading>
      <S.ModalWrap>
        <CustomForm.Modal
          buttonText="생성"
          title="등록하기"
          width={900}
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          {/* <AddStoreModal onCancel={closeModal} /> */}
        </CustomForm.Modal>
      </S.ModalWrap>
      <S.SwitchWrapper>
        <Switch
          onClick={handleDeleted}
          checked={isDeleted}
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
          columnSize={[10, 20, 15, 35, 10]}
        />
      )}
    </S.Container>
  );
}

export default StoreList;
