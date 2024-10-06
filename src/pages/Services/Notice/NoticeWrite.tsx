/* eslint-disable no-restricted-imports */
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import CustomForm from 'components/common/CustomForm';
import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { UploadOutlined } from '@ant-design/icons';
import useNoticeMutation from 'pages/Services/Notice/useNoticeMutation';
import { useUploadfileMutation } from 'store/api/upload';
import * as S from './NoticeWrite.style';

export default function NoticeWrite() {
  const { required } = CustomForm.useValidate();
  const [form] = CustomForm.useForm();
  const editorRef = useRef<Editor | null>(null);
  const { addNotice } = useNoticeMutation();
  const [uploadfile] = useUploadfileMutation();

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();
    if (editorInstance) {
      editorInstance.on('change', () => {
        const content = editorInstance.getHTML();
        form.setFieldsValue({ content });
      });
    }
    return () => {
      editorInstance?.off('change');
    };
  }, [form]);

  const onFinish = (values: any) => {
    const editorContent = editorRef.current?.getInstance().getHTML();
    if (editorContent) {
      values.content = editorContent;
    }
    addNotice(values);
  };

  return (
    <S.Container>
      <S.Heading>
        공지사항 글쓰기
      </S.Heading>
      <CustomForm form={form} onFinish={onFinish}>
        <S.FormWrapper>
          <CustomForm.Input label="글번호" name="id" disabled />
          <CustomForm.Input label="작성자" name="author" disabled />
          <CustomForm.Input label="게시일" name="created_at" disabled />
          <CustomForm.Input label="제목" name="title" rules={[required()]} />
          <CustomForm.Editor
            label="본문"
            name="content"
            initialEditType="wysiwyg"
            initialValue=" "
            height="500px"
            previewStyle="vertical"
            useCommandShortcut={false}
            ref={editorRef}
            rules={[required()]}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                try {
                  const response = await uploadfile({
                    domain: 'admin',
                    image: (() => {
                      const formData = new FormData();
                      formData.append('multipartFile', blob);
                      return formData;
                    })(),
                  }).unwrap();
                  callback(response.file_url, '');
                } catch (error) {
                  message.error('이미지 업로드에 실패했습니다.');
                }
              },
            }}
          />
        </S.FormWrapper>
        <S.ButtonWrapper>
          <CustomForm.Button
            icon={<UploadOutlined />}
            htmlType="submit"
            type="primary"
          >
            게시
          </CustomForm.Button>
        </S.ButtonWrapper>
      </CustomForm>
    </S.Container>
  );
}
