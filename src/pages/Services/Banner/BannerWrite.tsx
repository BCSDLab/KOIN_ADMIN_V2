import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useNavigate } from 'react-router-dom';
import { useGetBannerCategoryListQuery } from 'store/api/bannerCategory';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import { BannerFormValues, BannerRequest } from 'model/banner.model';
import emptyToNull from 'utils/ts/emptyToNull';
import { Flex } from 'antd';
import ConfirmModal from 'components/ConfirmModal/ConfirmModal';
import useBannerMutation from './useBannerMutation';
import BannerForm from './components/BannerForm/BannerForm';
import * as S from './BannerWrite.style';

export default function BannerWrite() {
  const navigate = useNavigate();
  const [form] = CustomForm.useForm();
  const editorRef = useRef<Editor | null>(null);
  const { addBanner } = useBannerMutation();
  const { data: BannerCategory } = useGetBannerCategoryListQuery();

  const {
    setTrue: openAddModal,
    value: isAddModalOpen,
    setFalse: closeAddModal,
  } = useBooleanState();
  const {
    setTrue: openDeleteModal,
    value: isDeleteModalOpen,
    setFalse: closeDeleteModal,
  } = useBooleanState();

  const bannerCategoryOptions: Record<string, string> = BannerCategory
    ? BannerCategory.banner_categories.reduce((categoryMap, bannerCategory) => {
      categoryMap[String(bannerCategory.id)] = bannerCategory.name;
      return categoryMap;
    }, {} as Record<string, string>)
    : {};

  const handleConfirm = () => {
    form.submit();
    closeAddModal();
  };

  const handleCancel = () => {
    closeDeleteModal();
    navigate(-1);
  };

  const handleFinish = (values: BannerRequest) => {
    const editorContent = editorRef.current?.getInstance().getHTML();

    const rawPayload = {
      ...values,
      content: editorContent ?? '',
    };

    const payload = emptyToNull(rawPayload);

    addBanner(payload);
  };

  const handleValuesChange = (changedValues: BannerFormValues) => {
    if ('banner_category' in changedValues) {
      const selectedId = changedValues.banner_category;
      form.setFieldsValue({
        banner_category_id: selectedId,
      });
    }
    if (changedValues.is_web_released === false) {
      form.setFieldsValue({ web_redirect_link: '' });
      return;
    }

    if (changedValues.is_android_released === false) {
      form.setFieldsValue({ android_redirect_link: '' });
      form.setFieldsValue({ android_minimum_version: '' });
      return;
    }

    if (changedValues.is_ios_released === false) {
      form.setFieldsValue({ ios_minimum_version: '' });
      form.setFieldsValue({ ios_redirect_link: '' });
    }
  };

  return (
    <S.Container>
      <S.HeadingWrapper>
        <DetailHeading>배너 추가</DetailHeading>
      </S.HeadingWrapper>

      <S.FormWrap>
        <CustomForm
          form={form}
          onValuesChange={handleValuesChange}
          onFinish={handleFinish}
          initialValues={{
            is_web_released: false,
            is_android_released: false,
            is_ios_released: false,
          }}
        >
          <BannerForm form={form} isEdit={false} categoryOptions={bannerCategoryOptions} />
        </CustomForm>
        <Flex justify="end" gap="10px">
          <CustomForm.Modal
            buttonText="취소"
            title="배너 생성 취소하기"
            footer={null}
            open={isDeleteModalOpen}
            onCancel={closeDeleteModal}
            onClick={openDeleteModal}
            isDelete
          >
            <ConfirmModal closeModal={closeDeleteModal} confirmText="작성 취소" cancelText="계속 작성" description="생성을 취소하시겠습니까?" onConfirm={handleCancel} />
          </CustomForm.Modal>
          <CustomForm.Modal
            buttonText="등록"
            title="배너 생성하기"
            footer={null}
            open={isAddModalOpen}
            onCancel={closeAddModal}
            onClick={openAddModal}
          >
            <ConfirmModal closeModal={closeAddModal} confirmText="등록" cancelText="취소" description="등록하시겠습니까?" onConfirm={handleConfirm} />
          </CustomForm.Modal>
        </Flex>

      </S.FormWrap>

    </S.Container>
  );
}
