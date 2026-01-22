import CustomTable from 'components/common/CustomTable';
import { useQuery } from '@tanstack/react-query';
import adminQueries from 'queryFactory/adminQueries';
import authQueries from 'queryFactory/authQueries';
import useBooleanState from 'utils/hooks/useBoolean';
import { Select, Switch } from 'antd';
import { useSearchParams } from 'react-router-dom';
import type { TrackType, Admin } from 'model/admin.model';
import type { ColumnsType } from 'antd/es/table';
import { TRACK_FILTER_OPTIONS } from 'constant/admin';
import CustomForm from 'components/common/CustomForm';
import * as S from './AdminList.style';
import AddAdminModal from './components/AddAdminModal';
import AdminAuthedButton from './components/AdminAuthedButton';
import useAdminMutation from './useAdminMutation';

export default function AdminList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const trackName = (searchParams.get('trackName') as TrackType) || undefined;
  const isAuthed = searchParams.get('isAuthed') !== 'false';

  const { data: myInfo } = useQuery(authQueries.adminInfo());
  const { data: adminList } = useQuery(
    adminQueries.adminList({ page, trackName, isAuthed }),
  );
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();
  const { changeAdminAuthedMutation } = useAdminMutation();

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

  const handleAuthedChange = (checked: boolean) => {
    updateSearchParams({
      isAuthed: String(checked),
      page: '1',
    });
  };

  const handlePageChange = (newPage: number) => {
    updateSearchParams({ page: String(newPage) });
  };

  const getAdminColumns = (): ColumnsType<Admin> => {
    const isSuperAdmin = myInfo?.super_admin ?? false;

    return [
      {
        title: '활성 상태',
        key: 'is_authed',
        dataIndex: 'is_authed',
        render: (value: boolean, record: Admin) => (
          <AdminAuthedButton
            id={record.id}
            name={record.name}
            isAuthed={value}
            disabled={!isSuperAdmin}
            onToggle={changeAdminAuthedMutation.mutate}
          />
        ),
      },
    ];
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
          <S.SwitchWrapper>
            <Switch
              checked={isAuthed}
              onChange={handleAuthedChange}
              checkedChildren="활성화 계정"
              unCheckedChildren="비활성화 계정"
            />
          </S.SwitchWrapper>
        </S.FilterWrap>
        {myInfo?.super_admin && (
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
        )}
      </S.ToolbarWrap>
      {adminList && (
        <CustomTable
          data={adminList.admins}
          pagination={{
            current: page,
            onChange: handlePageChange,
            total: adminList.total_page,
          }}
          columnSize={[10, 30, 20, 20, 20]}
          hiddenColumns={['can_create_admin', 'super_admin']}
          columns={getAdminColumns()}
        />
      )}
    </S.Container>
  );
}
