import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginState } from 'model/auth.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: sessionStorage.getItem('token') } as LoginState,
  reducers: {
    // 어드민은 인증토큰이 중요하므로 따로 스토리지에 보관하지 않고 redux내에서만 관리
    login: (
      state,
      {
        payload: { token, refresh_token },
      }: PayloadAction<{ token: string, refresh_token: string }>,
    ) => {
      state.token = token;
      sessionStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
    },

    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem('token');
    },

    refreshAccessToken: (
      state,
      {
        payload: { token, refresh_token },
      }: PayloadAction<{ token: string, refresh_token: string }>,
    ) => {
      state.token = token;
      sessionStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refresh_token);
    },
  },
});

export const { login, logout, refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;

export const useToken = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token;
};
