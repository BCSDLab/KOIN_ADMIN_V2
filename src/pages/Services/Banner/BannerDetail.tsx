import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useParams } from 'react-router-dom';
import { useGetBannerQuery } from 'store/api/banner';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import { BannerUpdateFormValues } from 'model/banner.model';
import emptyToNull from 'utils/ts/emptyToNull';
import CustomBreadcrumb from 'components/common/CustomBreadCrumb';
import * as S from 'styles/Detail.style';
import { Flex } from 'antd';
import useBannerMutation from './useBannerMutation';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import BannerForm from './components/BannerForm/BannerForm';

export default function BannerDetail() {
  const { id } = useParams();
  const editorRef = useRef<Editor | null>(null);
  const { data: bannerData } = useGetBannerQuery(Number(id));
  const [form] = CustomForm.useForm();
  const { updateBanner, deleteBanner } = useBannerMutation();

  const {
    setTrue: openUpdateModal,
    value: isUpdateModalOpen,
    setFalse: closeUpdateModal,
  } = useBooleanState();

  const {
    setTrue: openDeleteModal,
    value: isDeleteModalOpen,
    setFalse: closeDeleteModal,
  } = useBooleanState();

  const handleFinish = (values: BannerUpdateFormValues) => {
    const editorContent = editorRef.current?.getInstance().getHTML();

    const rawPayload = {
      ...values,
      content: editorContent ?? '',
    };

    const payload = emptyToNull(rawPayload);

    updateBanner(payload);
  };

  const handleConfirm = () => {
    form.submit();
    closeUpdateModal();
  };

  const handleDelete = () => {
    closeDeleteModal();
    deleteBanner(Number(id));
  };

  return (
    <S.Container>
      {bannerData ? (
        <>
          <DetailHeading>Banner Detail</DetailHeading>
          <CustomBreadcrumb
            items={[
              { label: 'BannerList', path: '/banner' },
              { label: 'BannerDetail' },
              { label: bannerData.title },
            ]}
          />

          <S.FormWrap>
            <CustomForm onFinish={handleFinish} form={form} initialValues={bannerData}>
              <BannerForm form={form} isEdit />
            </CustomForm>
            <Flex justify="end" gap="10px">
              <CustomForm.Modal
                buttonText="삭제"
                title="배너 삭제하기"
                footer={null}
                open={isDeleteModalOpen}
                onCancel={closeDeleteModal}
                onClick={openDeleteModal}
                isDelete
              >
                <ConfirmModal closeModal={closeDeleteModal} confirmText="삭제" cancelText="취소" description="삭제하겠습니까?" onConfirm={handleDelete} />
              </CustomForm.Modal>
              <CustomForm.Modal
                buttonText="수정"
                title="배너 수정하기"
                footer={null}
                open={isUpdateModalOpen}
                onCancel={closeUpdateModal}
                onClick={openUpdateModal}
              >
                <ConfirmModal closeModal={closeUpdateModal} confirmText="수정" cancelText="취소" description="수정 완료하겠습니까?" onConfirm={handleConfirm} />
              </CustomForm.Modal>
            </Flex>
          </S.FormWrap>
        </>
      ) : (
        <DetailHeading>해당 ID의 배너가 존재하지 않습니다.</DetailHeading>
      )}
    </S.Container>
  );
}
