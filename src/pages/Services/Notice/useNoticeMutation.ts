import { message } from 'antd';
import { NoticeRequest, NoticeUpdateForm } from 'model/notice.model';
import { useNavigate } from 'react-router-dom';
import { useAddNoticeMutation, useDeleteNoticeMutation, useUpdateNoticeMutation } from 'store/api/notice';

const useNoticeMutation = () => {
  const [addNoticeMutation] = useAddNoticeMutation();
  const [updateNoticeMutation] = useUpdateNoticeMutation();
  const [deleteNoticeMutation] = useDeleteNoticeMutation();
  const navigate = useNavigate();

  const addNotice = (formData: NoticeRequest, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    addNoticeMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('공지사항 게시가 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  const updateNotice = (formData: NoticeUpdateForm, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    updateNoticeMutation({ ...formData })
      .unwrap()
      .then(() => {
        message.success('공지사항 수정이 완료되었습니다.');
        onSuccess?.();
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
        navigate(-1);
      });
  };

  const deleteNotice = (id: number, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) => {
    deleteNoticeMutation(id)
      .unwrap()
      .then(() => {
        onSuccess?.();
        message.success('공지사항이 삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        onError?.(data.message);
        message.error(data.message);
      });
  };

  return { addNotice, updateNotice, deleteNotice };
};

export default useNoticeMutation;
