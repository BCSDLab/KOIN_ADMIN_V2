import { UploadOutlined } from '@ant-design/icons';
import sha256 from 'sha256';
import CustomForm from 'components/common/CustomForm';
import type { SignUpAdminRequest } from 'model/admin.model';
import useAdminMutation from 'pages/UserManage/Admin/useAdminMutation';
import * as S from 'pages/UserManage/Admin/AdminList.style';
import DetailForm from './DetailForm';

interface AddAdminModalProps {
  onClose: () => void;
}

export default function AddAdminModal({ onClose }: AddAdminModalProps) {
  const [form] = CustomForm.useForm();
  const { createAdminMutation } = useAdminMutation();

  const handleCreateAdmin = (values: SignUpAdminRequest) => {
    createAdminMutation.mutate({
      ...values,
      email: `${values.email}@koreatech.ac.kr`,
      password: sha256(values.password),
    }, {
      onSuccess: () => {
        onClose();
        form.resetFields();
      },
    });
  };

  return (
    <CustomForm
      onFinish={handleCreateAdmin}
      form={form}
    >
      <S.DetailFormWrap>
        <DetailForm isCreate />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            계정 생성
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
