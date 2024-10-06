/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { Form, message } from 'antd';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { UploadOutlined } from '@ant-design/icons';
import { useUploadfileMutation } from 'store/api/upload';
import * as S from './NoticeWriteForm.style';

export default function NoticeWriteForm() {
  const { required } = CustomForm.useValidate();
  const editorRef = useRef<Editor | null>(null);
  const [uploadfile] = useUploadfileMutation();

  useEffect(() => {
    const editorInstance = editorRef.current?.getInstance();

    if (editorInstance) {
      editorInstance.on('change', () => {
        const data = editorInstance.getHTML();
        console.log(data);
      });
    }

    return () => {
      editorInstance?.off('change');
    };
  }, []);

  return (
    <S.Container>
      <Form>
        <S.FormWrapper>
          <CustomForm.Input label="글번호" name="id" disabled />
          <CustomForm.Input label="작성자" name="name" disabled />
          <CustomForm.Input label="게시일" name="date" disabled />
          <CustomForm.Input label="제목" name="title" rules={[required()]} />
          <CustomForm.Editor
            label="본문"
            name="description"
            initialEditType="wysiwyg"
            initialValue=" "
            height="600px"
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
          <CustomForm.Button icon={<UploadOutlined />}>게시</CustomForm.Button>
        </S.ButtonWrapper>
      </Form>
    </S.Container>
  );
}
