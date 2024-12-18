import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryReauth from 'store/api/baseQueryReauth';
import { AppVersionResponse, OS, UpdateAppVersionRequest } from 'model/forceUpdate.model';

export const forceUpdateApi = createApi({
  reducerPath: 'forceUpdateApi',
  tagTypes: ['appVersion'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    getAppVersion: builder.query<AppVersionResponse, OS>({
      query: (type) => ({
        url: `admin/version/${type}`,
      }),
      providesTags: [{ type: 'appVersion', id: 'APPVERSION' }],
    }),
    updateAppVersion: builder.mutation<void, UpdateAppVersionRequest>({
      query(data) {
        const { type, ...body } = data;
        return {
          url: `admin/version/${type}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: () => [{ type: 'appVersion', id: 'APPVERSION' }],
    }),
  }),
});

export const { useGetAppVersionQuery, useUpdateAppVersionMutation } = forceUpdateApi;
