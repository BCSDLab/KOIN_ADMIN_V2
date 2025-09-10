export interface Address {
  bd_nm: string;
  emd_nm: string;
  eng_address: string;
  jibun_address: string;
  li_nm: string;
  rn: string;
  road_address: string;
  sgg_nm: string;
  si_nm: string;
  zip_no: string;
}

export interface AddressSearchRequest {
  keyword: string;
  currentPage?: string;
  countPerPage?: string;
}

export interface AddressSearchResponse {
  count_per_page: number;
  current_page: number;
  total_count: string;
  addresses: Address[]
}
