import { queryOptions } from '@tanstack/react-query';
import { AddressSearchRequest } from 'model/address.model';

const addressQueries = {
  allKey: () => ['address'],

  addressSearchKey: (keyword: string, currentPage: string, countPerPage: string) => [...addressQueries.allKey(), 'search', keyword, currentPage, countPerPage],
  addressSearch: ({ keyword, currentPage = '1', countPerPage = '10' }: AddressSearchRequest) => (queryOptions({
    queryKey: addressQueries.addressSearchKey(keyword, currentPage, countPerPage),
    queryFn: () => import('api/address').then(({ getAddressSearch }) => getAddressSearch({ keyword, currentPage, countPerPage })),
    enabled: !!keyword,
  })),
};

export default addressQueries;
