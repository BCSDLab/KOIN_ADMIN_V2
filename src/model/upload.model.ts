export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members';

export interface Uploads {
  domain: Domain;
  multipartFile: FormData[];
}

export interface Upload {
  domain: Domain;
  multipartFile: FormData;
}
