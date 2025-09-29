import { message } from 'antd';
import { NoticeRequest, NoticeUpdateForm } from 'model/notice.model';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNotice, updateNotice, deleteNotice } from 'api/notice';
import noticeQueries from 'queryFactory/noticeQueries';

const useNoticeMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addNoticeMutation = useMutation({
    mutationFn: (formData: NoticeRequest) => addNotice(formData),
    onSuccess: () => {
      message.success('공지사항 게시가 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: noticeQueries.allkeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const updateNoticeMutation = useMutation({
    mutationFn: (formData: NoticeUpdateForm) => updateNotice(formData),
    onSuccess: () => {
      message.success('공지사항 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: noticeQueries.allkeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: (id: number) => deleteNotice(id),
    onSuccess: () => {
      message.success('공지사항이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: noticeQueries.allkeys() });
      navigate(-1);
    },
    onError: (error) => {
      message.error(error.message || '에러가 발생했습니다.');
    },
  });

  return { addNoticeMutation, updateNoticeMutation, deleteNoticeMutation };
};

export default useNoticeMutation;
