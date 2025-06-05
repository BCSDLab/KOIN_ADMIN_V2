import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ClubFormValues, ClubRequest } from 'model/club.model';
import { useGetClubCategoryListQuery } from 'store/api/club';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useBooleanState from 'utils/hooks/useBoolean';
import * as S from 'styles/Detail.style';
import useClubMutation from './useClubMutation';
import ClubForm from './Components/ClubForm/ClubForm';

export default function ClubWrite() {
  const [form] = CustomForm.useForm();
  const navigate = useNavigate();

  const { data: ClubCategory } = useGetClubCategoryListQuery();
  const { addClub } = useClubMutation();

  const clubCategoryOptions: Record<string, string> = ClubCategory
    ? ClubCategory.club_categories.reduce((categoryMap, clubCategory) => {
      categoryMap[String(clubCategory.id)] = clubCategory.name;
      return categoryMap;
    }, {} as Record<string, string>)
    : {};

  const {
    setTrue: openAddModal,
    value: isAddModalOpen,
    setFalse: closeAddModal,
  } = useBooleanState();

  const {
    setTrue: openCancelModal,
    value: isDeleteModalOpen,
    setFalse: closeCancelModal,
  } = useBooleanState();

  const handleConfirm = () => {
    form.submit();
    closeAddModal();
  };

  const handleCancel = () => {
    closeCancelModal();
    navigate(-1);
  };

  const handleFinish = (values: ClubFormValues) => {
    const payload: ClubRequest = {
      ...values,
      club_managers: [{
        user_id: values.user_id,
      }],
    };
    addClub(payload);
  };

  const handleValuesChange = (changedValues: any) => {
    if ('club_category_name' in changedValues) {
      const selectedId = changedValues.club_category_name;
      form.setFieldsValue({
        club_category_id: Number(selectedId),
      });
    }
  };

  return (
    <S.Container>
      <DetailHeading>동아리 추가</DetailHeading>
      <S.FormWrap>
        <CustomForm
          form={form}
          onFinish={handleFinish}
          onValuesChange={handleValuesChange}
        >
          <ClubForm form={form} categoryOptions={clubCategoryOptions} />
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
            open={isAddModalOpen}
            onCancel={closeAddModal}
            onClick={openAddModal}
          >
            <ConfirmModal
              closeModal={closeAddModal}
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
