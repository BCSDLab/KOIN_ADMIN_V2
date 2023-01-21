export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members';

export interface Uploads {
  domain: Domain;
  body: File[];
}

export interface Upload {
  domain: Domain;
  image: FormData;
}

export interface UploadResponse {
  file_url: string;
}

export interface FileResponse {
  thumbUrl: string;
  url: string;
  name: string;
  uid: string;
}
