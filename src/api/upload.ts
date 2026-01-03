/* eslint-disable @typescript-eslint/naming-convention */
import type {
  FileData, UploadURLResponse,
} from 'model/upload.model';
import axios from 'axios';
import accessClient from 'api';

export const getPresignedUrl = async (domain:string, fileData: FileData) => {
  const response = await accessClient.post<UploadURLResponse>(`${domain}/upload/url`, fileData);
  return response.data;
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  await axios.put(presignedUrl, file, {
    headers: { 'Content-Type': file.type },
    withCredentials: false,
  });
};

export const uploadFile = async (domain: string, file: File): Promise<string> => {
  const fileData: FileData = {
    content_length: file.size,
    content_type: file.type,
    file_name: file.name,
  };

  const { pre_signed_url, file_url } = await getPresignedUrl(domain, fileData);
  await uploadToS3(pre_signed_url, file);

  return file_url;
};

export const uploadFiles = async (domain: string, files: File[]): Promise<string[]> => {
  return Promise.all(files.map((file) => uploadFile(domain, file)));
};
