import { useMutation } from '@tanstack/react-query';
import { uploadFiles, uploadFile } from 'api/upload';

interface UploadFileRequest {
  domain: string;
  file: File;
}

interface UploadFilesRequest {
  domain: string;
  files: File[];
}

export function useUploadFileMutation() {
  return useMutation({
    mutationFn: ({ domain, file }: UploadFileRequest) => uploadFile(domain, file),
  });
}

export function useUploadFilesMutation() {
  return useMutation({
    mutationFn: ({ domain, files }: UploadFilesRequest) => uploadFiles(domain, files),
  });
}
