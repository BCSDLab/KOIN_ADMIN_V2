/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { message } from 'antd';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { UploadOutlined } from '@ant-design/icons';
import { useUploadfileMutation } from 'store/api/upload';
import { useAddNoticeMutation } from 'store/api/notice';
import { useNavigate } from 'react-router-dom';
import * as S from './NoticeWriteForm.style';

interface NoticeWrite {
  title: string;
  content: string;
}

export default function NoticeWriteForm() {
  const { required } = CustomForm.useValidate();
  const editorRef = useRef<Editor | null>(null);
  const [uploadfile] = useUploadfileMutation();
  const [form] = CustomForm.useForm();
  const [addNotice] = useAddNoticeMutation();
  const navigate = useNavigate();

  const createNotice = async (values: NoticeWrite) => {
    try {
      const editorInstance = editorRef.current?.getInstance();
      const description = editorInstance?.getHTML() || '';

      if (!description || description === '<p><br></p>') {
        message.error('본문을 입력해주세요.');
        return;
      }

      const requestBody = {
        title: values.title,
        content: description,
      };

      await addNotice(requestBody).unwrap();
      navigate('/notice');
      message.success('공지사항 게시가 완료되었습니다.');
    } catch (error) {
      message.error('공지사항 게시에 실패했습니다.');
    }
  };

  return (
    <S.Container>
      <CustomForm
        onFinish={createNotice}
        form={form}
      >
        <S.FormWrapper>
          <CustomForm.Input label="글번호" name="id" disabled />
          <CustomForm.Input label="작성자" name="name" disabled />
          <CustomForm.Input label="게시일" name="date" disabled />
          <CustomForm.Input label="제목" name="title" rules={[required()]} />
          <CustomForm.Editor
            label="본문"
            name="content"
            initialEditType="wysiwyg"
            initialValue=" "
            height="600px"
            previewStyle="vertical"
            useCommandShortcut={false}
            ref={editorRef}
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
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">게시</CustomForm.Button>
        </S.ButtonWrapper>
      </CustomForm>
    </S.Container>
  );
}
