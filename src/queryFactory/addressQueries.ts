import { queryOptions } from '@tanstack/react-query';
import getAddressSearch from 'api/address';
import { AddressSearchRequest } from 'model/address.model';

const addressQueries = {
  allKeys: () => ['address'],

  addressSearchKey: (keyword: string, currentPage: string, countPerPage: string) => [...addressQueries.allKeys(), 'search', keyword, currentPage, countPerPage],
  addressSearch: ({ keyword, currentPage = '1', countPerPage = '10' }: AddressSearchRequest) => queryOptions({
    queryKey: addressQueries.addressSearchKey(keyword, currentPage, countPerPage),
    queryFn: () => getAddressSearch({ keyword, currentPage, countPerPage }),
    enabled: !!keyword,
  }),
};

export default addressQueries;
