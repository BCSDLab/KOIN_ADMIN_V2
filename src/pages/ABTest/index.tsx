import CustomForm from 'components/common/CustomForm';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBoolean';
import * as S from './ABTest.style';
import AddABTestModal from './components/AddABTestModal';
import { Dumy } from './dumy';

export default function ABTest() {
  const [page, setPage] = useState(1);
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();

  return (
    <S.Container>
      <CustomForm.Modal
        buttonText="생성"
        title="등록하기"
        width={900}
        footer={null}
        open={isModalOpen}
        onCancel={closeModal}
        onClick={openModal}
      >
        <AddABTestModal onCancel={closeModal} />
      </CustomForm.Modal>
      {Dumy && (
        <CustomTable
          data={Dumy.tests}
          pagination={{
            current: page,
            onChange: setPage,
            total: Dumy.total_page,
          }}
          columnSize={[10, 15, 40, 20, 15]}
          hiddenColumns={['id']}
        />
      )}
    </S.Container>
  );
}
