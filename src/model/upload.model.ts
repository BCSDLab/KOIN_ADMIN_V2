export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members' | 'owners' | 'admin' | 'banner';

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

export interface UploadsResponse {
  file_url: string[];
}
