import { Middleware, configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import { authApi } from './api/auth';
import { userApi } from './api/user';
import { roomApi } from './api/room';
import { memberApi } from './api/member';
import { uploadApi } from './api/upload';
import { storeApi } from './api/store';
import { storeMenuApi } from './api/storeMenu';
import { menuCategoriesApi } from './api/storeMenu/category';
import { noticeApi } from './api/notice';
import { ownerRequestApi } from './api/ownerRequest';
import { ownerApi } from './api/owner';
import { reviewApi } from './api/review';
import { abTestApi } from './api/abtest';
import { benefitApi } from './api/benefit';
import { forceUpdateApi } from './api/forceUpdate';
import { updateListApi } from './api/updateList';
import { historyApi } from './api/history';
import { bannerApi } from './api/banner';
import { bannerCategoryApi } from './api/bannerCategory';
import { addressApi } from './api/address';

const apiList = [
  authApi,
  userApi,
  roomApi,
  memberApi,
  uploadApi,
  storeApi,
  storeMenuApi,
  menuCategoriesApi,
  noticeApi,
  ownerRequestApi,
  ownerApi,
  reviewApi,
  abTestApi,
  benefitApi,
  forceUpdateApi,
  updateListApi,
  historyApi,
  bannerApi,
  bannerCategoryApi,
  addressApi,
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
