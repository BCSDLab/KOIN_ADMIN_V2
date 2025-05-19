import { EyeOutlined } from '@ant-design/icons';
import { Button, Space, Drawer } from 'antd';
import type { ColumnType } from 'antd/es/table';
import CustomForm from 'components/common/CustomForm';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useBooleanState from 'utils/hooks/useBoolean';
import RequestInfo from 'pages/UserManage/ClubManagerRequest/Components/RequestInfo/RequestInfo';

interface ClubManagerRequestList {
  id: number;
  is_active: boolean;
  info: boolean;
}

export default function CustomClubManagerColumn(): ColumnType<ClubManagerRequestList>[] {
  const {
    setTrue: openDrawer,
    value: isDrawerOpen,
    setFalse: closeDrawer,
  } = useBooleanState();

  const {
    setTrue: openUpdateModal,
    value: isUpdateModalOpen,
    setFalse: closeUpdateModal,
  } = useBooleanState();

  const {
    setTrue: openCancelModal,
    value: isDeleteModalOpen,
    setFalse: closeCancelModal,
  } = useBooleanState();

  const handleConfirm = () => {
    closeUpdateModal();
  };

  const handleCancel = () => {
    closeCancelModal();
  };

  return [
    {
      key: 'is_active',
      dataIndex: 'is_active',
      title: '승인/반려',
      render: () => (
        <Space>
          <CustomForm.Modal
            buttonText="반려"
            title="동아리 생성 및 권한 요청 반려하기"
            hasIcon={false}
            footer={null}
            open={isDeleteModalOpen}
            onCancel={closeCancelModal}
            onClick={openCancelModal}
          >
            <ConfirmModal
              closeModal={closeCancelModal}
              confirmText="반려"
              cancelText="취소"
              description="생성 및 권한 요청을 반려하시겠습니까?"
              onConfirm={handleCancel}
            />
          </CustomForm.Modal>
          <CustomForm.Modal
            buttonText="승인"
            title="동아리 생성 및 권한 요청 승인하기"
            hasIcon={false}
            footer={null}
            open={isUpdateModalOpen}
            onCancel={closeUpdateModal}
            onClick={openUpdateModal}
          >
            <ConfirmModal
              closeModal={closeUpdateModal}
              confirmText="승인"
              cancelText="취소"
              description="생성 및 권한 요청을 승인하시겠습니까?"
              onConfirm={handleConfirm}
            />
          </CustomForm.Modal>
        </Space>
      ),
    },
    {
      key: 'info',
      dataIndex: 'info',
      title: '정보보기',
      render: () => (
        <>
          <Button
            size="middle"
            icon={<EyeOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              openDrawer();
            }}
          >
            확인
          </Button>
          <Drawer
            title="동아리 상세정보"
            width={1200}
            closable={{ 'aria-label': 'Close Button' }}
            open={isDrawerOpen}
            onClose={closeDrawer}
          >
            <RequestInfo />
          </Drawer>

        </>

      ),
    },
  ];
}
