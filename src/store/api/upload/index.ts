import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import { Upload, UploadResponse, Uploads } from 'model/upload.model';

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
    uploadfiles: builder.mutation<void, Pick<Uploads, 'domain'> & Partial<Uploads>>({
      query({ domain, ...body }) {
        return {
          url: `${domain}/upload/files`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'files', id: 'LIST' }],
    }),

    uploadfile: builder.mutation<UploadResponse, Pick<Upload, 'domain'> & Partial<Upload>>({
      query({ domain, image }) {
        return {
          url: `${domain}/upload/file`,
          method: 'POST',
          body: image,
        };
      },
      invalidatesTags: [{ type: 'file', id: 'LIST' }],
    }),
  }),
});

export const { useUploadfileMutation, useUploadfilesMutation } = uploadApi;
