import CustomForm from 'components/common/CustomForm';
import CustomTable from 'components/common/CustomTable';
import { useQuery } from '@tanstack/react-query';
import adminQueries from 'queryFactory/adminQueries';
import useBooleanState from 'utils/hooks/useBoolean';
import { Select } from 'antd';
import { useSearchParams } from 'react-router-dom';
import type { TrackType } from 'model/admin.model';
import { TRACK_FILTER_OPTIONS } from 'constant/admin';
import * as S from './AdminList.style';
import AddAdminModal from './components/AddAdminModal';

export default function AdminList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const trackName = (searchParams.get('trackName') as TrackType) || undefined;

  const { data: adminList } = useQuery(
    adminQueries.adminList({ page, trackName }),
  );
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    setSearchParams(newParams);
  };

  const handleTrackChange = (value: string) => {
    updateSearchParams({
      trackName: value || undefined,
      page: '1',
    });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: String(newPage) });
  };

  return (
    <S.Container>
      <S.Heading>관리자 목록</S.Heading>
      <S.ToolbarWrap>
        <S.FilterWrap>
          <Select
            value={trackName || ''}
            onChange={handleTrackChange}
            options={TRACK_FILTER_OPTIONS}
            style={{ width: 150 }}
            placeholder="트랙 선택"
          />
        </S.FilterWrap>
        <CustomForm.Modal
          buttonText="계정 생성"
          title="관리자 계정 생성"
          width={700}
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          <AddAdminModal onClose={closeModal} />
        </CustomForm.Modal>
      </S.ToolbarWrap>
      {adminList && (
        <CustomTable
          data={adminList.admins}
          pagination={{
            current: page,
            onChange: handlePageChange,
            total: adminList.total_page,
          }}
          columnSize={[10, 20, 15, 15, 15]}
          hiddenColumns={['can_create_admin', 'super_admin']}
        />
      )}
    </S.Container>
  );
}
