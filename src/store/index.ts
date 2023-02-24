import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import logger from 'redux-logger';
import { authApi } from './api/auth';
import { userApi } from './api/user';
import { roomApi } from './api/room';
import { memberApi } from './api/member';
import { uploadApi } from './api/upload';
import { storeApi } from './api/store';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [memberApi.reducerPath]: memberApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      logger,
      authApi.middleware,
      userApi.middleware,
      roomApi.middleware,
      memberApi.middleware,
      uploadApi.middleware,
      storeApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
