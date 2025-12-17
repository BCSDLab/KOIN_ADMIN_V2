import { createApi } from '@reduxjs/toolkit/query/react';
import {
  ModifyBenefitDetails,
} from 'model/benefit.model';
import baseQueryReauth from 'store/api/baseQueryReauth';

export const benefitApi = createApi({
  reducerPath: 'benefit',
  tagTypes: ['benefits', 'benefit'],

  baseQuery: baseQueryReauth,

  endpoints: (builder) => ({
    modifyBenefitDetails: builder.mutation<void, ModifyBenefitDetails>({
      query({ modify_details }) {
        return {
          url: 'admin/benefit',
          method: 'put',
          body: { modify_details },
        };
      },
      invalidatesTags: () => [{ type: 'benefit' }],
    }),
  }),
});

export const {
  useModifyBenefitDetailsMutation,
} = benefitApi;
