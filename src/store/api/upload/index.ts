import { createApi } from '@reduxjs/toolkit/query/react';
import {
  Upload, UploadResponse, Uploads, UploadsResponse,
} from 'model/upload.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const uploadApi = createApi({
  reducerPath: 'file',
  tagTypes: ['files', 'file'],
  baseQuery: baseQueryReauth,
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
