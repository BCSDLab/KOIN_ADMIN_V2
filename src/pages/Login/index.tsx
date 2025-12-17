/* eslint-disable @typescript-eslint/naming-convention */
import { useNavigate } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from 'api/auth';
import sha256 from 'sha256';
import { message } from 'antd';
import { login } from 'store/slice/auth';
import { useDispatch } from 'react-redux';
import * as S from './Login.style';

function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate: loginMutation } = useMutation({
    mutationFn: postLogin,
    onSuccess: (value) => {
      const { token, refresh_token } = value;
      if (token && refresh_token) {
        dispatch(login({ token, refresh_token }));
      }
      navigate('/store');
    },

    onError: (error) => {
      if (error) {
        message.error(error.message);
      }
    },
  });

  const doLogin = (form: { id: string, password: string }) => {
    loginMutation({
      email: form.id,
      password: sha256(form.password),
    });
  };

  return { doLogin };
}

function Login() {
  const { required } = CustomForm.validateUtils();
  const { doLogin } = useLogin();
  const [loginForm] = CustomForm.useForm();

  return (
    <S.Container>
      <S.LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
      <S.LoginForm form={loginForm} onFinish={doLogin}>
        <S.Header>LOGIN</S.Header>
        <S.Divider />
        <S.FormInput
          autoComplete="id"
          placeholder="ID"
          label=""
          name="id"
          rules={[required()]}
        />
        <S.FormInput
          autoComplete="current-password"
          placeholder="PASSWORD"
          type="password"
          label=""
          name="password"
          rules={[required()]}
        />
        <S.SubmitButton type="primary" htmlType="submit">Login</S.SubmitButton>
      </S.LoginForm>
    </S.Container>
  );
}

export default Login;
