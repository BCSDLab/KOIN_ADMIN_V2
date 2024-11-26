import { useEffect } from 'react';
import { useLoginMutation } from 'store/api/auth';
import sha256 from 'sha256';
import { login, useToken } from 'store/slice/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import CustomForm from 'components/common/CustomForm';
import * as S from './Login.style';

function useLogin() {
  const token = useToken();
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/store');
  }, [token, navigate]);

  const doLogin = (form: { id: string, password: string }) => {
    loginMutation({
      email: form.id,
      password: sha256(form.password),
    })
      .unwrap()
      .then((value) => {
        dispatch(login(value));
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  };

  return {
    doLogin,
  };
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
