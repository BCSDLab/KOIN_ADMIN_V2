import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryReauth from 'store/api/baseQueryReauth';
import { AppVersionResponse, AppType } from 'model/forceUpdate.model';

export const forceUpdateApi = createApi({
  reducerPath: 'forceUpdateApi',
  tagTypes: ['appVersion'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getAppVersion: builder.query<AppVersionResponse, AppType>({
      query: (type) => ({
        url: `admin/version/${type}`,
        method: 'GET',
      }),
      providesTags: [{ type: 'appVersion', id: 'APPVERSION' }],
    }),
  }),

});

export const {
  useGetAppVersionQuery,
} = forceUpdateApi;
