import { useMutation } from '@tanstack/react-query';
import { uploadFiles, uploadFile } from 'api/upload';
import type {
  Upload,
  Uploads,
} from 'model/upload.model';

export function useUploadFilesMutation() {
  return useMutation({
    mutationFn: (payload:Uploads) => uploadFiles(payload),
  });
}

export function useUploadFileMutation() {
  return useMutation({
    mutationFn: (payload:Upload) => uploadFile(payload),
  });
}
