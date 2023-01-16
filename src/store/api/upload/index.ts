import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';

interface Upload {
  domain: string;
  body: string;
}

interface Uploads {
  domain: string;
  body: string[];
}

export const uploadApi = createApi({
  reducerPath: 'file',
  tagTypes: ['files', 'file'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadfiles: builder.mutation<Uploads, Partial<Uploads>>({
      query(data) {
        const { domain, ...body } = data;
        return {
          url: `${domain}/upload/files`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'files', id: 'LIST' }],
    }),

    uploadfile: builder.mutation<Upload, Partial<Upload>>({
      query(data) {
        const { domain, ...body } = data;
        return {
          url: `${domain}/upload/file`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'file', id: 'LIST' }],
    }),
  }),
});

export const { useUploadfileMutation, useUploadfilesMutation } = uploadApi;
