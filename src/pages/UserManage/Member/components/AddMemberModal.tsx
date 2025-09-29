/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import { Member } from 'model/member.model';
import DetailForm from './DetailForm';
import * as S from '../MemberList.style';
import useMemberMutation from '../useMemberMutation';

export default function AddMemberModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addMemberMutation } = useMemberMutation(1);

  const createMember = (values: Partial<Member>) => {
    addMemberMutation.mutate(values);
    onCancel();
    form.resetFields();
  };

  return (
    <CustomForm
      onFinish={createMember}
      form={form}
    >
      <S.DetailFormWrap>
        <DetailForm form={form} />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
