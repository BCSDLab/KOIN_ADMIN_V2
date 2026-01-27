import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef, useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteOutlined, UploadOutlined, EditOutlined, LeftOutlined, CloseOutlined,
} from '@ant-design/icons';
import {
  Button, Divider, Modal, message,
} from 'antd';
import { Editor } from '@toast-ui/react-editor';
import { useUploadFileMutation } from 'hooks/useUploadMutation';
import type { NoticeRequest, NoticeUpdateForm } from 'model/notice.model';
import HistoryArea from 'components/common/HistoryArea';
import { useQuery } from '@tanstack/react-query';
import historyQueries from 'queryFactory/historyQueries';
import noticeQueries from 'queryFactory/noticeQueries';
import useNoticeMutation from './useNoticeMutation';
import * as S from './NoticeDetail.style';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const { updateNoticeMutation, deleteNoticeMutation } = useNoticeMutation();
  const { mutateAsync: uploadFile } = useUploadFileMutation();
  const { required } = CustomForm.validateUtils();
  const [form] = CustomForm.useForm();
  const {
    data: histories,
  } = useQuery(historyQueries.history({ page: 1, domainId: Number(id) }));
  const { data: notice } = useQuery(noticeQueries.notice(Number(id)));

  const handleFinish = (values: NoticeRequest) => {
    const editorContent = editorRef.current?.getInstance().getHTML();
    if (editorContent) values.content = editorContent;

    const noticeForm: NoticeUpdateForm = {
      id: Number(id),
      ...values,
    };

    updateNoticeMutation.mutate(noticeForm, {
      onSuccess: () => setIsEditing(false),
    });
  };

  return (
    <S.Container>
      {notice && (
        <>
          <S.HeadingWrapper>
            <Button onClick={() => navigate(-1)} icon={<LeftOutlined />} />
            <S.Heading>공지사항 상세보기</S.Heading>
          </S.HeadingWrapper>
          <CustomForm
            form={form}
            initialValues={notice}
            onFinish={handleFinish}
          >
            <S.FormWrapper>
              <CustomForm.Input label="글번호" name="id" disabled />
              <CustomForm.Input label="작성자" name="author" disabled />
              <CustomForm.Input label="게시일" name="created_at" disabled />
              <CustomForm.Input label="제목" name="title" rules={[required()]} disabled={!isEditing} />
              {isEditing ? (
                <CustomForm.Editor
                  label="본문"
                  name="content"
                  initialEditType="wysiwyg"
                  initialValue={notice.content}
                  height="500px"
                  previewStyle="vertical"
                  useCommandShortcut={false}
                  ref={editorRef}
                  rules={[required()]}
                  hooks={{
                    addImageBlobHook:
                    async (blob: Blob, callback: (url: string, altText: string) => void) => {
                      try {
                        const file = new File([blob], `image-${Date.now()}.png`, { type: blob.type });
                        const imageURL = await uploadFile({ domain: 'admin', file });
                        callback(imageURL, '');
                      } catch {
                        message.error('이미지 업로드에 실패했습니다.');
                      }
                    },
                  }}
                />
              ) : (
                <CustomForm.Viewer label="본문" name="content" disabled rules={[required()]} initialValue={notice.content} />
              )}
            </S.FormWrapper>
          </CustomForm>
          <S.ButtonWrapper>
            <CustomForm.Button
              danger
              icon={isEditing ? <CloseOutlined /> : <DeleteOutlined />}
              onClick={() => (isEditing ? setIsEditing(false) : setIsModalOpen(true))}
            >
              {isEditing ? '취소' : '삭제'}
            </CustomForm.Button>
            <CustomForm.Button
              icon={isEditing ? <UploadOutlined /> : <EditOutlined />}
              htmlType="button"
              onClick={() => (isEditing ? form.submit() : setIsEditing(true))}
            >
              {isEditing ? '저장' : '수정'}
            </CustomForm.Button>
          </S.ButtonWrapper>
          {histories && (
            <HistoryArea
              histories={histories.histories}
              creator={notice.author}
              created_at={notice.created_at}
              style={{ left: '20px', bottom: '-70px' }}
            />
          )}
          <Modal
            title="공지사항 삭제 확인"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <Divider />
            해당 공지사항을 삭제하시겠습니까?
            <br />
            코인에 게시된 글도 함께 삭제됩니다.
            <S.ButtonWrapper>
              <Button
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </Button>
              <Button
                danger
                onClick={() => deleteNoticeMutation.mutate(Number(id))}
              >
                삭제
              </Button>
            </S.ButtonWrapper>
          </Modal>
        </>
      )}
    </S.Container>
  );
}
