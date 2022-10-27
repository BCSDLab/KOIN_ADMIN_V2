import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import logger from 'redux-logger';
import { authApi } from './api/auth';
import { userApi } from './api/user';
import { roomApi } from './api/Room';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger, authApi.middleware, userApi.middleware, roomApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
