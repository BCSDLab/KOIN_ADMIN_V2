import CustomForm from 'components/common/CustomForm';
import { UploadOutlined } from '@ant-design/icons';
import { Divider, message } from 'antd';
import { useCreateBenefitCategoryMutation } from 'store/api/benefit';
import { CreateBenefitRequest } from 'model/benefit.model';
import * as S from './index.style';

interface Props {
  closeCreateModal: () => void;
}
export default function CreationModal({ closeCreateModal }: Props) {
  const [form] = CustomForm.useForm();
  const [createBenefit, {
    isError,
  }] = useCreateBenefitCategoryMutation();

  const onFinish = (formData: CreateBenefitRequest) => {
    if (!formData.detail || !formData.title || !formData.on_image_url || !formData.off_image_url) {
      message.error('모든 값을 입력하세요.');
      return;
    }
    createBenefit(formData).then(() => closeCreateModal());
  };

  if (isError) message.error('혜택 등록에 실패했습니다.');
  return (
    <CustomForm
      form={form}
      onFinish={onFinish}
    >
      <CustomForm.Input name="title" label="카테고리 명" maxLength={20} minLength={5} />
      <CustomForm.Input name="detail" label="혜택 설명 문구" maxLength={100} minLength={10} />
      <Divider orientation="left">아이콘 (필수)</Divider>
      <S.UploadWarpper>
        <S.Label>
          토글 전
        </S.Label>
        <CustomForm.SingleUpload domain="shops" name="on_image_url" form={form} />
      </S.UploadWarpper>
      <S.UploadWarpper>
        <S.Label>
          토글 후
        </S.Label>
        <CustomForm.SingleUpload domain="shops" name="off_image_url" form={form} />
      </S.UploadWarpper>
      <S.FlexRight>
        <CustomForm.Button
          icon={<UploadOutlined />}
          htmlType="submit"
        >
          완료
        </CustomForm.Button>
      </S.FlexRight>
    </CustomForm>
  );
}
