import CustomForm from 'components/common/CustomForm';
import { UploadOutlined } from '@ant-design/icons';
import { Divider, message } from 'antd';
import { ModifyBenefitForm } from 'model/benefit.model';
import * as S from 'pages/Services/Benefit/components/CreationModal/index.style';
import benefitQueries from 'queryFactory/benefitQueries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { modifyBenefitCategory } from 'api/benefit';

interface Props {
  closeModifyModal: () => void;
  selected: number | undefined;
}
export default function ModifyModal({ closeModifyModal, selected }: Props) {
  const { data } = useQuery(benefitQueries.getBenefitCategory());
  const [form] = CustomForm.useForm<ModifyBenefitForm>();
  const { mutate: modifyBenefit, isError } = useMutation({
    mutationFn: modifyBenefitCategory,
    onSuccess: () => {
      closeModifyModal();
    },
    onError: () => {
      message.error('혜택 수정에 실패했습니다.');
    },

  });
  const onFinish = (formData: ModifyBenefitForm) => {
    if (!formData.detail || !formData.title || !formData.on_image_url || !formData.off_image_url) {
      message.error('모든 값을 입력하세요.');
      return;
    }
    if (selected) modifyBenefit({ id: selected, body: formData });
  };
  if (isError) message.error('혜택 등록에 실패했습니다.');
  if (!data) return null;
  return (
    <CustomForm
      form={form}
      preserve={false}
      initialValues={data.benefits.find((benefit) => benefit.id === selected)}
      onFinish={onFinish}
    >
      <CustomForm.Input name="title" label="카테고리 명" maxLength={20} minLength={5} />
      <CustomForm.Input name="detail" label="혜택 설명 문구" maxLength={100} minLength={10} />
      <Divider orientation="left">아이콘 (필수)</Divider>
      <S.UploadWrapper>
        <S.Label>
          토글 전
        </S.Label>
        <CustomForm.SingleUpload domain="shops" name="on_image_url" form={form} />
      </S.UploadWrapper>
      <S.UploadWrapper>
        <S.Label>
          토글 후
        </S.Label>
        <CustomForm.SingleUpload domain="shops" name="off_image_url" form={form} />
      </S.UploadWrapper>
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
