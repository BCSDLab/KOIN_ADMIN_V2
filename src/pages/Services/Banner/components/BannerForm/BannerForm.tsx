import { Divider, Form } from 'antd';
import { FormInstance } from 'antd/lib';
import CustomForm from 'components/common/CustomForm';

interface BannerFormProps {
  form: FormInstance;
  isEdit: boolean;
  categoryOptions?: Record<string, string>;
}

export default function BannerForm({ form, isEdit, categoryOptions }: BannerFormProps) {
  const { required } = CustomForm.validateUtils();

  const isWebReleased = Form.useWatch('is_web_released', form);
  const isAndReleased = Form.useWatch('is_android_released', form);
  const isIosReleased = Form.useWatch('is_ios_released', form);

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
      <CustomForm.Input
        label="WEB 연결 링크"
        name="web_redirect_link"
        disabled={!isWebReleased}
      />
      <CustomForm.Input
        label="And 연결 링크"
        name="android_redirect_link"
        disabled={!isAndReleased}
      />
      <CustomForm.Input
        label="iOS 연결 링크"
        name="ios_redirect_link"
        disabled={!isIosReleased}
      />

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input
          label="Android 최소 버전"
          name="android_minimum_version"
          disabled={!isAndReleased}
        />
        <CustomForm.Input
          label="iOS 최소 버전"
          name="ios_minimum_version"
          disabled={!isIosReleased}
        />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr 1fr">
        <CustomForm.Checkbox name="is_web_released">WEB 배포 여부</CustomForm.Checkbox>
        <CustomForm.Checkbox name="is_android_released">AND 배포 여부</CustomForm.Checkbox>
        <CustomForm.Checkbox name="is_ios_released">IOS 배포 여부</CustomForm.Checkbox>
      </CustomForm.GridRow>

      <Divider orientation="left" style={{ marginTop: '40px' }}>
        이미지
      </Divider>

      <CustomForm.SingleImageUpload form={form} name="image_url" domain="banner" />

      <Divider orientation="left" style={{ marginTop: '40px' }} />

      <CustomForm.Switch label="활성화 여부" name="is_active" disabled={!isEdit} />
    </>
  );
}
