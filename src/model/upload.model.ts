export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members';

export interface Uploads {
  domain: Domain;
  body: FormData[];
}

export interface Upload {
  domain: Domain;
  body: FormData;
}
