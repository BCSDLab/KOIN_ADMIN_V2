import type {
  Upload, UploadResponse, Uploads, UploadsResponse,
} from 'model/upload.model';
import accessClient from './index';

export const uploadFiles = async (payload: Uploads): Promise<UploadsResponse> => {
  const { domain, images } = payload;
  const url = `${domain}/upload/files`;
  const res = await accessClient.post<UploadsResponse>(url, images);
  return res.data;
};

export const uploadFile = async (payload: Upload): Promise<UploadResponse> => {
  const { domain, image } = payload;
  const url = `${domain}/upload/file`;
  const res = await accessClient.post<UploadResponse>(url, image);
  return res.data;
};
