import { Flex } from 'antd';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetClubCategoryListQuery, useGetClubQuery } from 'store/api/club';
import {
  ClubUpdateFormValues, ClubUpdateRequest,
} from 'model/club.model';
import CustomBreadcrumb from 'components/common/CustomBreadCrumb';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import useBooleanState from 'utils/hooks/useBoolean';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import * as S from 'styles/Detail.style';
import ClubForm from './Components/ClubForm/ClubForm';
import useClubMutation from './useClubMutation';

export default function ClubDetail() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [form] = CustomForm.useForm();

  const { data: ClubData, isLoading, isError } = useGetClubQuery(Number(id));
  const { data: ClubCategory } = useGetClubCategoryListQuery();
  const { updateClub } = useClubMutation();

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
    navigate(-1);
  };

  const clubCategoryOptions: Record<string, string> = useMemo(() => (
    ClubCategory
      ? ClubCategory.club_categories.reduce((categoryMap: Record<string, string>, clubCategory) => {
        categoryMap[String(clubCategory.id)] = clubCategory.name;
        return categoryMap;
      }, {} as Record<string, string>)
      : {}
  ), [ClubCategory]);

  const initialValues = useMemo(() => {
    if (!ClubData || !clubCategoryOptions) return undefined;

    const firstManager = ClubData.club_managers?.[0] ?? {};
    const managerFields = {
      user_id: firstManager.user_id,
      manager_name: firstManager.name,
      manager_phone: firstManager.phone_number,
    };

    const snsFields = ClubData.sns_contacts?.reduce((acc, contact) => {
      switch (contact.sns_type) {
        case '전화 번호':
          acc.phone_number = contact.contact;
          break;
        case '인스타그램':
          acc.instagram = contact.contact;
          break;
        case '구글 폼':
          acc.google_form = contact.contact;
          break;
        case '오픈 채팅':
          acc.open_chat = contact.contact;
          break;
        default:
          break;
      }
      return acc;
    }, {} as Record<string, string>);

    const categoryId = Object.entries(clubCategoryOptions).find(
      ([, name]) => name === ClubData.club_category_name,
    )?.[0];

    return {
      ...ClubData,
      ...managerFields,
      ...snsFields,
      club_category_id: categoryId ? Number(categoryId) : undefined,
    };
  }, [ClubData, clubCategoryOptions]);

  const handleFinish = (values : ClubUpdateFormValues) => {
    const payload: ClubUpdateRequest = {
      ...values,
      club_managers: [{
        user_id: values.user_id,
      }],
    };
    updateClub(payload);
  };

  const handleValuesChange = (changedValues: any) => {
    if ('club_category_name' in changedValues) {
      const selectedId = changedValues.club_category_name;
      form.setFieldsValue({
        club_category_id: Number(selectedId),
      });
    }
  };

  if (isLoading) {
    return (
      <>
      </>
    );
  }

  if (!ClubData || isError) {
    return (
      <S.Container>
        <DetailHeading>해당 ID의 동아리가 존재하지 않습니다.</DetailHeading>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <DetailHeading>Club Detail</DetailHeading>
      <CustomBreadcrumb
        items={[
          { label: 'ClubList', path: '/club' },
          { label: 'ClubDetail' },
          { label: ClubData!.name },
        ]}
      />
      <S.FormWrap>
        <CustomForm
          form={form}
          onFinish={handleFinish}
          initialValues={initialValues}
          onValuesChange={handleValuesChange}
        >
          <ClubForm form={form} categoryOptions={clubCategoryOptions} />
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
