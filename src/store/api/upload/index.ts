import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { API_PATH } from 'constant';

interface Image {
  domain: string;
  body: string;
}

interface Images {
  domain: string;
  body: string[];
}

export const imageApi = createApi({
  reducerPath: 'image',
  tagTypes: ['images', 'image'],
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
    addImages: builder.mutation<Images, Partial<Images>>({
      query(data) {
        const { domain, ...body } = data;
        return {
          url: `${domain}/upload/files`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'images', id: 'LIST' }],
    }),

    addImage: builder.mutation<Image, Partial<Image>>({
      query(data) {
        const { domain, ...body } = data;
        return {
          url: `${domain}/upload/file`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'image', id: 'LIST' }],
    }),
  }),
});

export const { useAddImagesMutation, useAddImageMutation } = imageApi;
