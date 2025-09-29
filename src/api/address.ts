import accessClient from 'api';
import { AddressSearchRequest, AddressSearchResponse } from 'model/address.model';

const getAddressSearch = async ({ keyword, currentPage = '1', countPerPage = '10' }: AddressSearchRequest) => {
  const { data } = await accessClient.get<AddressSearchResponse>('/address/search', {
    params: { keyword, currentPage, countPerPage },
  });
  return data;
};

export default getAddressSearch;
