import { Middleware, configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import { authApi } from './api/auth';
import { userApi } from './api/user';
import { roomApi } from './api/room';
import { memberApi } from './api/member';
import { uploadApi } from './api/upload';
import { storeApi } from './api/store';
import { categoryApi } from './api/category';
import { storeMenuApi } from './api/storeMenu';
import { menuCategoriesApi } from './api/storeMenu/category';
import { ownerRequestApi } from './api/ownerRequest';
import { ownerApi } from './api/owner';

const apiList = [
  authApi,
  userApi,
  roomApi,
  memberApi,
  uploadApi,
  storeApi,
  categoryApi,
  storeMenuApi,
  menuCategoriesApi,
  ownerRequestApi,
  ownerApi,
];

const apiMiddleware = apiList.map((api) => api.middleware);

const apiReducer = apiList.reduce((acc, api) => {
  acc[api.reducerPath] = api.reducer;
  return acc;
}, {} as { [key: string]: any });

const reducer = {
  auth: authReducer,
  ...apiReducer,
};

const middleware = (getDefaultMiddleware: () => Middleware[]) => [
  ...getDefaultMiddleware(), ...apiMiddleware,
];

const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
