import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LoginState } from 'model/auth.model';
import { RootState } from 'store';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: sessionStorage.getItem('token') } as LoginState,
  reducers: {
    // 어드민은 인증토큰이 중요하므로 따로 스토리지에 보관하지 않고 redux내에서만 관리
    setCredentials: (
      state,
      { payload: { token } }: PayloadAction<{ token: string }>,
    ) => {
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
