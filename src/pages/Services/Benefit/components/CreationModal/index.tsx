import CustomForm from 'components/common/CustomForm';
import { UploadOutlined } from '@ant-design/icons';
import { Divider, Button } from 'antd';
import { useCreateBenefitCategoryMutation } from 'store/api/benefit';
import { CreateBenefitRequest } from 'model/benefit.model';

function UploadImage({ name }: { name: string }) {
  return (
    <div>
      <Button>
        <UploadOutlined />
        Upload
      </Button>
      <CustomForm.Input name={name} label="test" type="file" style={{ display: 'none' }} />
    </div>
  );
}

export default function CreationModal() {
  const [form] = CustomForm.useForm();
  const [createBenefit] = useCreateBenefitCategoryMutation();

  const onFinish = (formData: CreateBenefitRequest) => {
    if (!formData.detail || !formData.title || !formData.on_image_url || !formData.off_image_url) {
      return;
    }
    createBenefit(formData);
  };
  return (
    <CustomForm
      form={form}
      onFinish={onFinish}
    >
      <CustomForm.Input name="title" label="카테고리 명" maxLength={20} />
      <CustomForm.Input name="detail" label="혜택 설명 문구" maxLength={100} minLength={10} />

      <Divider orientation="left">아이콘 (필수)</Divider>

      <UploadImage name="on_image_url" />

      <CustomForm.Button
        icon={<UploadOutlined />}
        htmlType="submit"
      >
        완료
      </CustomForm.Button>
    </CustomForm>
  );
}
