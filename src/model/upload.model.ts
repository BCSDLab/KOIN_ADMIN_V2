export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members';

export interface Uploads {
  domain: Domain;
  images: FormData[];
}

export interface Upload {
  domain: Domain;
  image: FormData;
}

export interface UploadResponse {
  file_url: string;
}
