import { Middleware, configureStore } from '@reduxjs/toolkit';
import authReducer from 'store/slice/auth';
import { authApi } from './api/auth';
import { uploadApi } from './api/upload';
import { abTestApi } from './api/abtest';
import { benefitApi } from './api/benefit';
import { updateListApi } from './api/updateList';
import { bannerApi } from './api/banner';
import { bannerCategoryApi } from './api/bannerCategory';
import { addressApi } from './api/address';

const apiList = [
  authApi,
  uploadApi,
  abTestApi,
  benefitApi,
  updateListApi,
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
