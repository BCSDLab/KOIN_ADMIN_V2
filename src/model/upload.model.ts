export type Domain = 'items' | 'lands' | 'circles' | 'market' | 'shops' | 'members' | 'owners' | 'admin' | 'banner' | 'club';
export interface FileData {
  content_length: number;
  content_type: string;
  file_name: string;
}

export interface UploadURLResponse {
  pre_signed_url: string;
  file_url: string;
  expiration_date: string;
}

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
