import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { changeAdminInfo, createAdmin, changeAdminAuthed } from 'api/admin';
import type { Admin, SignUpAdminRequest, ChangeAdminAuthedRequest } from 'model/admin.model';
import adminQueries from 'queryFactory/adminQueries';
import { useNavigate } from 'react-router-dom';

export default function useAdminMutation(id?: number) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateAdminMutation = useMutation({
    mutationFn: (formData: Partial<Admin>) => changeAdminInfo(id!, formData),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: adminQueries.allKeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const createAdminMutation = useMutation({
    mutationFn: (formData: SignUpAdminRequest) => createAdmin(formData),
    onSuccess: () => {
      message.success('관리자 계정이 생성되었습니다.');
      queryClient.invalidateQueries({ queryKey: adminQueries.allKeys() });
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const changeAdminAuthedMutation = useMutation({
    mutationFn: ({
      id: adminId,
      body,
    }: { id: number; body: ChangeAdminAuthedRequest }) => changeAdminAuthed(adminId, body),
    onSuccess: () => {
      message.success('인증 상태가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: adminQueries.allKeys() });
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return {
    updateAdminMutation,
    createAdminMutation,
    changeAdminAuthedMutation,
  };
}
