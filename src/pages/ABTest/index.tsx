import CustomForm from 'components/common/CustomForm';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import useBooleanState from 'utils/hooks/useBoolean';
import { useQuery } from '@tanstack/react-query';
import abTestQueries from 'queryFactory/abTestQueries';
import authQueries from 'queryFactory/authQueries';
import * as S from './ABTest.style';
import AddABTestModal from './components/AddABTestModal';

export default function ABTest() {
  const [page, setPage] = useState(1);
  const { data: abtestList } = useQuery(abTestQueries.abTests(page, 10));
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();
  const { data: adminInfo } = useQuery(authQueries.adminInfo());
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
        <AddABTestModal onCancel={closeModal} creator={adminInfo?.name || ''} />
      </CustomForm.Modal>
      {abtestList && (
        <CustomTable
          data={abtestList.tests}
          pagination={{
            current: page,
            onChange: setPage,
            total: abtestList.total_page,
          }}
          columnSize={[10, 15, 40, 20, 15]}
          hiddenColumns={['id']}
        />
      )}
    </S.Container>
  );
}
