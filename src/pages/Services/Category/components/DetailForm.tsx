import CustomForm from 'components/common/CustomForm';
import { FormInstance } from 'antd/es/form/Form';
import { Divider } from 'antd';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required } = CustomForm.validateUtils();

  return (
    <>
      <CustomForm.Input name="id" label="ID" disabled />
      <CustomForm.Input name="name" label="카테고리명" rules={[required()]} />
      <Divider orientation="left">이미지 (필수)</Divider>
      <CustomForm.SingleUpload name="image_url" domain="shops" form={form} />
    </>
  );
}
