import sha256 from 'sha256';
import { Button, Flex, message } from 'antd';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import { styled } from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from 'api/auth';

interface PasswordFormData {
  currentPassword: string,
  newPassword: string,
  passwordConfirmation: string,
}

const ButtonContainer = styled(Flex)`
  padding-top: 12px;
`;

export default function ChangePasswordFormModal() {
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState(false);

  const [changePasswordForm] = CustomForm.useForm();
  const { required } = CustomForm.validateUtils();

  const handleModalClose = () => {
    closeModal();
    changePasswordForm.resetFields();
  };

  const { mutate: changePasswordMutation } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      message.success('비밀번호 변경 완료');
      handleModalClose();
    },
    onError: (error) => {
      message.error(error.message || '비밀번호 변경 실패');
    },
  });

  const onFinish = (formData: PasswordFormData) => {
    const hashedCurrentPassword = sha256(formData.currentPassword);
    const hashedNewPassword = sha256(formData.passwordConfirmation);

    changePasswordMutation({
      old_password: hashedCurrentPassword,
      new_password: hashedNewPassword,
    });
  };

  return (
    <CustomForm.Modal
      buttonText="비밀번호 변경"
      title="비밀번호 변경"
      footer={null}
      open={isModalOpen}
      onCancel={closeModal}
      onClick={openModal}
      hasIcon={false}
    >
      <CustomForm form={changePasswordForm} onFinish={onFinish}>
        <CustomForm.Input
          label="현재 비밀번호"
          name="currentPassword"
          type="password"
          rules={[required()]}
        />
        <CustomForm.Input
          label="새 비밀번호"
          name="newPassword"
          type="password"
          rules={[required()]}
        />
        <CustomForm.Input
          label="새 비밀번호 확인"
          name="passwordConfirmation"
          type="password"
          dependencies={['newPassword']}
          rules={[
            required(),
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('새 비밀번호와 일치하지 않습니다.'));
              },
            }),
          ]}
        />
        <ButtonContainer justify="end">
          <Button onClick={handleModalClose}>취소하기</Button>
          <Button htmlType="submit">변경하기</Button>
        </ButtonContainer>
      </CustomForm>
    </CustomForm.Modal>
  );
}
