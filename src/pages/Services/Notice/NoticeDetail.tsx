import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRef, useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
  DeleteOutlined, UploadOutlined, EditOutlined, LeftOutlined, CloseOutlined,
} from '@ant-design/icons';
import { useGetNoticeQuery } from 'store/api/notice';
import {
  Button, Divider, Modal, message,
} from 'antd';
import { Editor } from '@toast-ui/react-editor';
import { useUploadfileMutation } from 'store/api/upload';
import { NoticeRequest, NoticeUpdateForm } from 'model/notice.model';
import { useGetHistoriesQuery } from 'store/api/history';
import HistoryArea from 'components/common/HistoryArea';
import useNoticeMutation from './useNoticeMutation';
import * as S from './NoticeDetail.style';

export default function NoticeDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef<Editor | null>(null);
  const { data: notice } = useGetNoticeQuery(Number(id));
  const { updateNotice, deleteNotice } = useNoticeMutation();
  const [uploadfile] = useUploadfileMutation();
  const { required } = CustomForm.validateUtils();
  const [form] = CustomForm.useForm();
  const { data: histories } = useGetHistoriesQuery({ page: 1, domainId: Number(id) });

  const handleFinish = (values: NoticeRequest) => {
    const editorContent = editorRef.current?.getInstance().getHTML();
    if (editorContent) values.content = editorContent;

    const noticeForm: NoticeUpdateForm = {
      id: Number(id),
      ...values,
    };

    updateNotice(noticeForm, {
      onSuccess: () => setIsEditing(false),
    });
  };

  const handleImageUpload = async (blob: Blob) => {
    const formData = new FormData();
    formData.append('multipartFile', blob);
    return formData;
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
                    addImageBlobHook: async (blob, callback) => {
                      try {
                        const formData = await handleImageUpload(blob);
                        const response = await uploadfile({
                          domain: 'admin',
                          image: formData,
                        }).unwrap();
                        callback(response.file_url, '');
                      } catch (error) {
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
                onClick={() => deleteNotice(Number(id))}
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
