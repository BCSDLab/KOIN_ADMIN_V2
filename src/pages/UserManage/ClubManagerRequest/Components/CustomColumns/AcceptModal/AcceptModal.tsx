import { Space } from 'antd';
import CustomForm from 'components/common/CustomForm';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useBooleanState from 'utils/hooks/useBoolean';

export default function AcceptModal() {
  const {
    setTrue: openAcceptModal,
    value: isAcceptModalOpen,
    setFalse: closeAcceptModal,
  } = useBooleanState();

  const {
    setTrue: openRejectModal,
    value: isRejectModalOpen,
    setFalse: closeRejectModal,
  } = useBooleanState();

  const handleConfirm = () => {
    closeAcceptModal();
  };

  const handleReject = () => {
    closeRejectModal();
  };

  return (
    <Space>
      <CustomForm.Modal
        buttonText="승인"
        title="동아리 생성 및 권한 요청 승인하기"
        hasIcon={false}
        footer={null}
        open={isAcceptModalOpen}
        onCancel={closeAcceptModal}
        onClick={openAcceptModal}
      >
        <ConfirmModal
          closeModal={closeAcceptModal}
          confirmText="승인"
          cancelText="취소"
          description="생성 및 권한 요청을 승인하시겠습니까?"
          onConfirm={handleConfirm}
        />
      </CustomForm.Modal>
      <CustomForm.Modal
        buttonText="반려"
        title="동아리 생성 및 권한 요청 반려하기"
        hasIcon={false}
        footer={null}
        open={isRejectModalOpen}
        onCancel={closeRejectModal}
        onClick={openRejectModal}
      >
        <ConfirmModal
          closeModal={closeRejectModal}
          confirmText="반려"
          cancelText="취소"
          description="생성 및 권한 요청을 반려하시겠습니까?"
          onConfirm={handleReject}
        />
      </CustomForm.Modal>
    </Space>
  );
}
