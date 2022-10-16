import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import logger from 'redux-logger';
import { authApi } from './api/auth';
import { userApi } from './api/user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(logger, authApi.middleware, userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
