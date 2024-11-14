import CustomForm from 'components/common/CustomForm';
import { FormInstance } from 'antd/es/form/Form';
import { Divider } from 'antd';
import { useGetParentCategoryQuery } from 'store/api/category';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required } = CustomForm.useValidate();
  const { data } = useGetParentCategoryQuery();
  console.log(data);

  return (
    <>
      <CustomForm.Input name="id" label="ID" disabled />
      <CustomForm.Input name="name" label="카테고리명" rules={[required()]} />
      <CustomForm.Select name="parent-name" label="상위 카테고리" rules={[required()]} disabled={false} options={{}} />
      <Divider orientation="left">이미지 (필수)</Divider>
      <CustomForm.SingleUpload name="image_url" domain="shops" form={form} />
    </>
  );
}
