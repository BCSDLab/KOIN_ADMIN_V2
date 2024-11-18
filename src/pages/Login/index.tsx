import { useEffect } from 'react';
import { useLoginMutation } from 'store/api/auth';
import sha256 from 'sha256';
import { setCredentials, useToken } from 'store/slice/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CustomForm from 'components/common/CustomForm';
import useValidate from 'utils/hooks/useValidate';
import * as S from './Login.style';

function useLogin() {
  const token = useToken();
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/store');
  }, [token, navigate]);

  const login = (form: { id: string, password: string }) => {
    loginMutation({
      email: form.id,
      password: sha256(form.password),
    })
      .unwrap()
      .then((value) => {
        const credentials = value;
        dispatch(setCredentials(credentials));
        sessionStorage.setItem('token', credentials.token);
        localStorage.setItem('refresh_token', credentials.refresh_token);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  };

  return {
    login,
  };
}

function Login() {
  const { required } = useValidate();
  const { login } = useLogin();
  const [loginForm] = CustomForm.useForm();

  return (
    <S.Container>
      <S.LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
      <S.LoginForm form={loginForm} onFinish={login}>
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
