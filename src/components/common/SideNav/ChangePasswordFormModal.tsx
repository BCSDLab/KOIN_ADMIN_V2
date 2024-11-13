import sha256 from 'sha256';
import { Button, Flex, message } from 'antd';
import { useChangePasswordMutation } from 'store/api/auth';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import { styled } from 'styled-components';

interface PasswordFormData {
  currentPassword: string,
  newPassword: string,
  checkPassword: string,
}

const ModalWrap = styled.div`
  span.ant-btn-icon {
    display: none;
  }
`;

const ButtonContainer = styled(Flex)`
  padding-top: 12px;

  button {
    border-radius: 5px;
  }
`;

export default function ChangePasswordFormModal() {
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState(false);
  const {
    value: isPasswordCorrect, setTrue: correctPassword, setFalse: incorrectPassword,
  } = useBooleanState(true);
  const {
    value: isNewPasswordMatch, setTrue: matchPassword, setFalse: notMatchPassword,
  } = useBooleanState(true);

  const [changePassword] = useChangePasswordMutation();
  const [changePasswordForm] = CustomForm.useForm();
  const { required } = CustomForm.useValidate();

  const handlePasswordMatch = () => {
    if (changePasswordForm.getFieldValue('newPassword') === changePasswordForm.getFieldValue('checkPassword')) {
      matchPassword();
    } else {
      notMatchPassword();
    }
  };

  const onFinish = (formData: PasswordFormData) => {
    const hashedCurrentPassword = sha256(formData.currentPassword);
    const hashedNewPassword = sha256(formData.checkPassword);
    if (formData.newPassword !== formData.checkPassword) {
      message.error('새 비밀번호를 다시 확인해주세요.');
      return;
    }
    changePassword({ old_password: hashedCurrentPassword, new_password: hashedNewPassword })
      .unwrap()
      .then(() => {
        message.success('비밀번호 변경 완료');
        correctPassword();
        closeModal();
        changePasswordForm.resetFields();
      })
      .catch(({ data }) => {
        message.error(data.message);
        incorrectPassword();
      });
  };

  return (
    <ModalWrap>
      <CustomForm.Modal
        buttonText="비밀번호 변경"
        title="비밀번호 변경"
        footer={null}
        open={isModalOpen}
        onCancel={closeModal}
        onClick={openModal}
      >
        <CustomForm form={changePasswordForm} onFinish={onFinish}>
          <CustomForm.Input
            label="현재 비밀번호"
            name="currentPassword"
            type="password"
            rules={[required()]}
          />
          { !isPasswordCorrect && <div style={{ color: 'red' }}>현재 비밀번호가 일치하지 않습니다.</div> }
          <CustomForm.Input
            label="새 비밀번호"
            name="newPassword"
            type="password"
            onChange={handlePasswordMatch}
            rules={[required()]}
          />
          <CustomForm.Input
            label="새 비밀번호 확인"
            name="checkPassword"
            type="password"
            onChange={handlePasswordMatch}
            rules={[required()]}
          />
          { !isNewPasswordMatch && <div style={{ color: 'red' }}>새 비밀번호와 일치하지 않습니다.</div> }
          <ButtonContainer justify="end">
            <Button onClick={closeModal}>취소하기</Button>
            <CustomForm.Button htmlType="submit">변경하기</CustomForm.Button>
          </ButtonContainer>
        </CustomForm>
      </CustomForm.Modal>
    </ModalWrap>
  );
}
