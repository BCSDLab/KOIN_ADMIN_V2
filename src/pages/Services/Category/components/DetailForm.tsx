import CustomForm from 'components/common/CustomForm';
import { FormInstance } from 'antd/es/form/Form';
import { Divider } from 'antd';
import { useQuery } from '@tanstack/react-query';
import categoryQueries from 'queryFactory/categoryQueries';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required } = CustomForm.validateUtils();
  const { data } = useQuery(categoryQueries.parent());
  const options: Record<number, string> = {};

  if (!data) return null;

  data.forEach(({ id, name }) => {
    options[id] = name;
  });

  return (
    <>
      <CustomForm.Input name="id" label="ID" disabled />
      <CustomForm.Input name="name" label="카테고리명" rules={[required()]} />
      <CustomForm.Select name="parent_category_id" label="상위 카테고리" rules={[required()]} disabled={false} options={options} />
      <Divider orientation="left">이미지sdfsd (필수)</Divider>
      <CustomForm.SingleUpload name="image_url" domain="shops" form={form} />
    </>
  );
}
