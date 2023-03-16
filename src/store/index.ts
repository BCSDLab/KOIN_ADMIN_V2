import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import logger from 'redux-logger';
import { authApi } from './api/auth';
import { userApi } from './api/user';
import { roomApi } from './api/room';
import { memberApi } from './api/member';
import { uploadApi } from './api/upload';
import { storeApi } from './api/store';

const apiMiddleware = [authApi, userApi, roomApi, memberApi, uploadApi, storeApi]
  .map((api) => api.middleware);

const reducer = {
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [roomApi.reducerPath]: roomApi.reducer,
  [memberApi.reducerPath]: memberApi.reducer,
  [uploadApi.reducerPath]: uploadApi.reducer,
  [storeApi.reducerPath]: storeApi.reducer,
} as const;

const middleware = [...getDefaultMiddleware(), ...apiMiddleware, logger];

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
