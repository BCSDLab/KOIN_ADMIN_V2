import * as Common from 'styles/List.style';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import NoticeWriteForm from './components/NoticeWriteForm/NoticeWriteForm';
import * as S from './index.style';

export default function NoticeWritePage() {
  return (
    <S.Container>
      <Common.Heading>
        공지사항 글쓰기
      </Common.Heading>
      <NoticeWriteForm />
    </S.Container>
  );
}
