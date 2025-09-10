import { createApi } from '@reduxjs/toolkit/query/react';
import { AddressSearchRequest, AddressSearchResponse } from 'model/address.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const addressApi = createApi({
  reducerPath: 'address',
  baseQuery: baseQueryReauth,
  tagTypes: ['address'],

  endpoints: (builder) => ({
    getAddressSearch: builder.query<AddressSearchResponse, AddressSearchRequest>({
      query: ({ keyword, currentPage = '1', countPerPage = '10' }) => ({
        url: 'address/search',
        params: { keyword, currentPage, countPerPage },
      }),
    }),
  }),
});

export const {
  useGetAddressSearchQuery,
  useLazyGetAddressSearchQuery,
} = addressApi;
