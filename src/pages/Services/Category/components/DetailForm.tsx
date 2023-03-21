import CustomForm from 'components/common/CustomForm';
import { FormInstance } from 'antd/es/form/Form';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required } = CustomForm.useValidate();

  return (
    <>
      <CustomForm.Input name="id" label="ID" disabled />
      <CustomForm.Input name="name" label="카테고리명" rules={[required()]} />
      <CustomForm.SingleUpload name="image_url" domain="shops" form={form} />
    </>
  );
}
