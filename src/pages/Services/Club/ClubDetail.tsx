import { Flex } from 'antd';
import { useMemo, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ClubUpdateFormValues, ClubUpdateRequest,
} from 'model/club.model';
import CustomBreadcrumb from 'components/common/CustomBreadCrumb';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import useBooleanState from 'utils/hooks/useBoolean';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import * as S from 'styles/Detail.style';
import { useQuery } from '@tanstack/react-query';
import clubQueries from 'queryFactory/clubQueries';
import useClubMutation from 'pages/Services/Club/useClubMutation';
import ClubForm from './Components/ClubForm/ClubForm';

function LoadingFallback() {
  return (
    <S.Container>
      <DetailHeading>동아리 정보 로딩 중...</DetailHeading>
    </S.Container>
  );
}

function ClubDetailContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = CustomForm.useForm();

  const { putClubMutation } = useClubMutation();

  const { data: clubData } = useQuery(clubQueries.club(Number(id)));
  const { data: clubCategory } = useQuery(clubQueries.categoryList());
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

  const clubCategoryOptions = useMemo(() => {
    if (!clubCategory) return {};

    return Object.fromEntries(
      clubCategory.club_categories.map((category) => [String(category.id), category.name]),
    );
  }, [clubCategory]);

  const initialValues = useMemo(() => {
    if (!clubData || !clubCategoryOptions) return null;

    const firstManager = clubData.club_managers?.[0] ?? {};
    const managerFields = {
      user_id: firstManager.user_id,
      manager_name: firstManager.name,
      manager_phone: firstManager.phone_number,
    };

    const snsFields = Object.fromEntries(
      clubData.sns_contacts?.map((sns) => {
        switch (sns.sns_type) {
          case '전화 번호':
            return ['phone_number', sns.contact];
          case '인스타그램':
            return ['instagram', sns.contact];
          case '구글 폼':
            return ['google_form', sns.contact];
          case '오픈 채팅':
            return ['open_chat', sns.contact];
          default:
            return [];
        }
      }).filter((entry) => entry.length > 0),
    );

    const categoryId = Object.entries(clubCategoryOptions).find(
      ([, name]) => name === clubData.club_category_name,
    )?.[0];

    return {
      ...clubData,
      ...managerFields,
      ...snsFields,
      club_category_id: categoryId ? Number(categoryId) : undefined,
    };
  }, [clubData, clubCategoryOptions]);

  const handleFinish = (values : ClubUpdateFormValues) => {
    const payload: ClubUpdateRequest = {
      ...values,
      club_managers: [{
        user_id: values.user_id,
      }],
    };
    putClubMutation.mutate(payload);
  };

  const handleValuesChange = (changedValues: any) => {
    if ('club_category_name' in changedValues) {
      const selectedId = changedValues.club_category_name;
      form.setFieldsValue({
        club_category_id: Number(selectedId),
      });
    }
  };

  if (!clubData || !initialValues) {
    return null;
  }

  return (
    <S.Container>
      <DetailHeading>Club Detail</DetailHeading>
      <CustomBreadcrumb
        items={[
          { label: 'ClubList', path: '/club' },
          { label: 'ClubDetail' },
          { label: clubData!.name },
        ]}
      />

      <S.FormWrap>
        <CustomForm
          form={form}
          onFinish={handleFinish}
          initialValues={initialValues || {}}
          onValuesChange={handleValuesChange}
        >
          <ClubForm form={form} categoryOptions={clubCategoryOptions} isEdit />
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

export default function ClubDetail() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClubDetailContent />
    </Suspense>
  );
}
