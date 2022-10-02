import { FormEvent, useEffect, useRef } from 'react';
import { useLoginMutation } from 'store/api/auth';
import sha256 from 'sha256';
import { SECOND_PASSWORD } from 'constant';
import makeToast from 'utils/ts/makeToast';
import { LoginResponse } from 'model/auth.model';
import { setCredentials } from 'store/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import type { InputRef } from 'antd';
import * as S from './Login.style';

function useLogin() {
  const idRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);
  const secondPasswordRef = useRef<InputRef>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const [loginMutation] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const refList = [idRef.current, passwordRef.current, secondPasswordRef.current];
    if (refList.some((current) => (current?.input?.value === ''))) makeToast('warning', '필수 입력값을 입력해주세요.');
    else if (refList[2]?.input?.value !== SECOND_PASSWORD) makeToast('error', '올바른 계정이 아닙니다.');
    else {
      const res = await loginMutation({
        portal_account: refList[0]?.input?.value!,
        password: sha256(refList[1]?.input?.value!),
      });

      if ('data' in res) {
        const credentials = res.data as LoginResponse;
        dispatch(setCredentials(credentials));
      } else if ('error' in res) {
        makeToast('error', '올바른 계정이 아닙니다.');
      }
    }
  };

  return {
    idRef, passwordRef, secondPasswordRef, login,
  };
}

function Login() {
  const {
    idRef, passwordRef, secondPasswordRef, login,
  } = useLogin();
  return (
    <S.Container>
      <S.LogoImg src="https://static.koreatech.in/assets/img/logo_primary.png" alt="KOIN 로고" />
      <S.LoginForm onSubmit={login}>
        <S.Header>LOGIN</S.Header>
        <S.Divider />
        <S.FormInput ref={idRef} autoComplete="id" placeholder="ID" />
        <S.FormInput ref={passwordRef} type="password" autoComplete="current-password" placeholder="PASSWORD" />
        <S.FormInput ref={secondPasswordRef} type="password" placeholder="SECOND PASSWORD" />
        <S.SubmitButton type="primary" htmlType="submit">Login</S.SubmitButton>
      </S.LoginForm>
    </S.Container>
  );
}

export default Login;
