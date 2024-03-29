import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetStoreListQuery } from 'store/api/store';
import CustomForm from 'components/common/CustomForm';
import useBooleanState from 'utils/hooks/useBoolean';
import { Switch } from 'antd';
import * as S from './StoreList.style';
import AddStoreModal from './components/AddStoreModal';

function StoreList() {
  const [page, setPage] = useState(1);
  const { setTrue: openModal, value: isModalOpen, setFalse: closeModal } = useBooleanState();
  const { value: isDeletedStore, changeValue: containIsDeletedStore } = useBooleanState(false);
  const { data: StoreRes } = useGetStoreListQuery({
    page,
    is_deleted: isDeletedStore,
  });

  return (
    <S.Container>
      <S.Heading>주변 상점 목록</S.Heading>
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
          <AddStoreModal closeModal={closeModal} />
        </CustomForm.Modal>
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
