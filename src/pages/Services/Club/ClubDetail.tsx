import { Flex } from 'antd';
import CustomBreadcrumb from 'components/common/CustomBreadCrumb';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
// import { useParams } from 'react-router-dom';
import * as S from 'styles/Detail.style';
import useBooleanState from 'utils/hooks/useBoolean';
import ClubForm from './Components/ClubForm/ClubForm';
import ConfirmModal from './Components/ConfirmModal/ConfirmModal';

export default function ClubDetail() {
  // const { id } = useParams();
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
      <DetailHeading>Club Detail</DetailHeading>
      <CustomBreadcrumb
        items={[
          { label: 'ClubList', path: '/club' },
          { label: 'ClubDetail' },
          // { label: ClubData.title },
        ]}
      />
      <S.FormWrap>
        <CustomForm form={form}>
          <ClubForm form={form} />
        </CustomForm>
        <Flex justify="end" gap="10px">
          <CustomForm.Modal
            buttonText="취소"
            title="수정 취소하기"
            footer={null}
            open={isDeleteModalOpen}
            onCancel={closeCancelModal}
            onClick={openCancelModal}
            isDelete
          >
            <ConfirmModal
              closeModal={closeCancelModal}
              confirmText="수정 취소"
              cancelText="계속 수정"
              description="수정을 취소하시겠습니까?"
              onConfirm={handleCancel}
            />
          </CustomForm.Modal>
          <CustomForm.Modal
            buttonText="수정"
            title="동아리 수정하기"
            footer={null}
            open={isUpdateModalOpen}
            onCancel={closeUpdateModal}
            onClick={openUpdateModal}
          >
            <ConfirmModal
              closeModal={closeUpdateModal}
              confirmText="수정"
              cancelText="취소"
              description="수정 완료하겠습니까?"
              onConfirm={handleConfirm}
            />
          </CustomForm.Modal>
        </Flex>
      </S.FormWrap>
    </S.Container>
  );
}
