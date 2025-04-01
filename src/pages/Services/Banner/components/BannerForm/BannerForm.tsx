import { Divider } from 'antd';
import { FormInstance } from 'antd/lib';
import CustomForm from 'components/common/CustomForm';

interface BannerFormProps {
  form: FormInstance;
  isEdit: boolean;
  categoryOptions?: Record<string, string>;
}

export default function BannerForm({ form, isEdit, categoryOptions }: BannerFormProps) {
  const { required } = CustomForm.validateUtils();
  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="배너 ID" name="id" disabled />
        <CustomForm.Input label="제목" name="title" rules={[required()]} />
      </CustomForm.GridRow>
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="카테고리 ID" name="banner_category_id" disabled />
        <CustomForm.Select
          label="카테고리 명"
          name="banner_category"
          options={categoryOptions ?? {}}
          rules={[required()]}
          selectProps={{
            disabled: isEdit,
          }}
        />
      </CustomForm.GridRow>
      <CustomForm.Input label="WEB 연결 링크" name="web_redirect_link" />
      <CustomForm.Input label="And 연결 링크" name="android_redirect_link" />
      <CustomForm.Input label="iOS 연결 링크" name="ios_redirect_link" />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="Android 최소 버전" name="android_minimum_version" />
        <CustomForm.Input label="iOS 최소 버전" name="ios_minimum_version" />
      </CustomForm.GridRow>
      <Divider orientation="left" style={{ marginTop: '40px' }}>
        이미지
      </Divider>
      <CustomForm.SingleUpload form={form} name="image_url" domain="banner" />
      <Divider orientation="left" style={{ marginTop: '40px' }} />
      <CustomForm.Switch label="활성화 여부" name="is_active" disabled={!isEdit} />
    </>
  );
}
