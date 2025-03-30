import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useParams } from 'react-router-dom';
import { useGetBannerQuery } from 'store/api/banner';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import { BannerUpdateFormValues } from 'model/banner.model';
import useBannerMutation from './useBannerMutation';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import BannerForm from './components/BannerForm/BannerForm';
import * as S from './BannerDetail.style';

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

    const payload = {
      ...values,
      android_redirect_link: values.android_redirect_link === '' ? null : values.android_redirect_link,
      android_minimum_version: values.android_minimum_version === '' ? null : values.android_minimum_version,
      ios_redirect_link: values.ios_redirect_link === '' ? null : values.ios_redirect_link,
      ios_minimum_version: values.ios_minimum_version === '' ? null : values.ios_minimum_version,
      content: editorContent ?? '',
    };

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
      {bannerData && (
        <>
          <DetailHeading>Banner Detail</DetailHeading>
          <S.BreadCrumb>
            {`Banner Management / Banner Detail / ${bannerData?.title}`}
          </S.BreadCrumb>
          <S.FormWrap>
            <CustomForm onFinish={handleFinish} form={form} initialValues={bannerData}>
              <BannerForm form={form} isEdit />
            </CustomForm>
            <S.ButtonWrapper>
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
            </S.ButtonWrapper>
          </S.FormWrap>
        </>
      )}
    </S.Container>
  );
}
