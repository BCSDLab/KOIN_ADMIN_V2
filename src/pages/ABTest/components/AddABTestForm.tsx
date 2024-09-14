import CustomForm from 'components/common/CustomForm';
import { Divider } from 'antd';

export default function DetailForm() {
  const { required } = CustomForm.useValidate();

  return (
    <>
      <CustomForm.Input name="name" label="이름" rules={[required()]} />
      <Divider orientation="left">이미지 (필수)</Divider>
    </>
  );
}
