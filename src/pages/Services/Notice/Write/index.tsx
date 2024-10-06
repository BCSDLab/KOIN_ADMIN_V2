import * as Common from 'styles/List.style';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import NoticeWriteForm from './components/NoticeWriteForm/NoticeWriteForm';
import * as S from './index.style';

export default function NoticeWritePage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <Common.Heading>
        <LeftOutlined style={{ marginRight: '10px', cursor: 'pointer' }} onClick={() => navigate(-1)} />
        공지사항 글쓰기
      </Common.Heading>
      <NoticeWriteForm />
    </S.Container>
  );
}
