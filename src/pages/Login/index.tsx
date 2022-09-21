import { FormEvent, useEffect, useRef } from 'react';
import { useLoginMutation } from 'store/api/auth';
import sha256 from 'sha256';
import { SECOND_PASSWORD } from 'constant';
import showToast from 'utils/ts/showToast';
import { LoginResponse } from 'model/auth.model';
import { setCredentials } from 'store/slice/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import * as S from './Login.style';

function useLogin() {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
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
    if (refList.some((current) => (current?.value === ''))) showToast('warning', '필수 입력값을 입력해주세요.');
    else if (refList[2]?.value !== SECOND_PASSWORD) showToast('error', '올바른 계정이 아닙니다.');
    else {
      const res = await loginMutation({
        portal_account: refList[0]?.value!,
        password: sha256(refList[1]?.value!),
      });

      if ('data' in res) {
        const credentials = res.data as LoginResponse;
        dispatch(setCredentials(credentials));
      } else if ('error' in res) {
        showToast('error', '올바른 계정이 아닙니다.');
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
      <form onSubmit={login}>
        <input ref={idRef} autoComplete="id" />
        <input ref={passwordRef} type="password" autoComplete="current-password" />
        <input ref={secondPasswordRef} type="password" />
        <button type="submit">login</button>
      </form>
    </S.Container>
  );
}

export default Login;
