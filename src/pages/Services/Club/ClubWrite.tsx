import { Flex } from 'antd';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import * as S from 'styles/Detail.style';
import useBooleanState from 'utils/hooks/useBoolean';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import ClubForm from './Components/ClubForm/ClubForm';

export default function ClubWrite() {
  const [form] = CustomForm.useForm();

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
    form.submit();
    closeUpdateModal();
  };

  const handleCancel = () => {
    closeCancelModal();
  };

  return (
    <S.Container>
      <DetailHeading>동아리 추가</DetailHeading>
      <S.FormWrap>
        <CustomForm form={form}>
          <ClubForm form={form} />
        </CustomForm>
        <Flex justify="end" gap="10px">
          <CustomForm.Modal
            buttonText="취소"
            title="등록 취소하기"
            footer={null}
            open={isDeleteModalOpen}
            onCancel={closeCancelModal}
            onClick={openCancelModal}
            isDelete
          >
            <ConfirmModal
              closeModal={closeCancelModal}
              confirmText="등록 취소"
              cancelText="계속 등록"
              description="등록을 취소하시겠습니까?"
              onConfirm={handleCancel}
            />
          </CustomForm.Modal>
          <CustomForm.Modal
            buttonText="등록"
            title="등록하기"
            footer={null}
            open={isUpdateModalOpen}
            onCancel={closeUpdateModal}
            onClick={openUpdateModal}
          >
            <ConfirmModal
              closeModal={closeUpdateModal}
              confirmText="등록"
              cancelText="취소"
              description="동아리를 등록하시겠습니까?"
              onConfirm={handleConfirm}
            />
          </CustomForm.Modal>
        </Flex>
      </S.FormWrap>
    </S.Container>

  );
}
