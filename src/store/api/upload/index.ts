import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';
import {
  Upload, UploadResponse, Uploads, UploadsResponse,
} from 'model/upload.model';

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
    uploadfiles: builder.mutation<UploadsResponse, Uploads>({
      query({ domain, images }) {
        return {
          url: `${domain}/upload/files`,
          method: 'POST',
          body: images,
        };
      },
    }),

    uploadfile: builder.mutation<UploadResponse, Upload>({
      query({ domain, image }) {
        return {
          url: `${domain}/upload/file`,
          method: 'POST',
          body: image,
        };
      },
    }),
  }),
});

export const { useUploadfileMutation, useUploadfilesMutation } = uploadApi;
