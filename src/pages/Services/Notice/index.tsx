import { useNavigate } from 'react-router-dom';

export default function NoticePage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>
        공지사항 목록
      </h1>
      <button
        type="button"
        onClick={() => {
          navigate('/notice/write');
        }}
      >
        글쓰기
      </button>
    </>
  );
}
