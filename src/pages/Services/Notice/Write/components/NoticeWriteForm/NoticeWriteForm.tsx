/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { UploadOutlined } from '@ant-design/icons';
import * as S from './NoticeWriteForm.style';

export default function NoticeWriteForm() {
  const { required } = CustomForm.useValidate();
  const editorRef = useRef<Editor | null>(null);

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
      <S.FormWrapper>
        <CustomForm.Input label="글번호" name="id" disabled />
        <CustomForm.Input label="작성자" name="name" rules={[required()]} />
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
        />
      </S.FormWrapper>
      <S.ButtonWrapper>
        <CustomForm.Button icon={<UploadOutlined />}>게시</CustomForm.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}
