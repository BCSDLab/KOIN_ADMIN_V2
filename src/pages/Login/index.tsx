import { SyntheticEvent, useEffect, useRef } from 'react';
import { useLoginMutation } from 'store/api/auth';
import sha256 from 'sha256';
import { setCredentials, useToken } from 'store/slice/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { InputRef, message } from 'antd';

import * as S from './Login.style';

function useLogin() {
  const idRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const token = useToken();
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate('/store');
  }, [token, navigate]);

  const login = async (e: SyntheticEvent) => {
    e.preventDefault();
    const refList = [idRef.current, passwordRef.current];

    if (refList.some((current) => (current?.input?.value === ''))) message.warning('필수 입력값을 입력해주세요.');
    else {
      const res = await loginMutation({
        email: refList[0]?.input?.value!,
        password: sha256(refList[1]?.input?.value!),
      });

      if ('data' in res) {
        const credentials = res.data;
        dispatch(setCredentials(credentials));
        sessionStorage.setItem('token', credentials.token);
        localStorage.setItem('refresh_token', credentials.refresh_token);
      } else if ('error' in res) {
        message.error('올바른 계정이 아닙니다.');
      }
    }
  };

  return {
    idRef, passwordRef, login,
  };
}

function Login() {
  const {
    idRef, passwordRef, login,
  } = useLogin();

  return (
    <S.Container>
      <S.LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
      <S.LoginForm onSubmit={login}>
        <S.Header>LOGIN</S.Header>
        <S.Divider />
        <S.FormInput ref={idRef} autoComplete="id" placeholder="ID" />
        <S.FormInput ref={passwordRef} type="password" autoComplete="current-password" placeholder="PASSWORD" />
        <S.SubmitButton type="primary" htmlType="submit">Login</S.SubmitButton>
      </S.LoginForm>
    </S.Container>
  );
}

export default Login;
