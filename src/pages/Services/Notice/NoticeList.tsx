import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import CustomForm from 'components/common/CustomForm';
import * as S from './NoticeList.style';

const temp = {
  notices: [
    {
      id: 1,
      제목: 'test',
      글쓴이: 'test',
      생성일: 'test',
    },
  ],
  total_count: 1,
  current_count: 1,
  total_page: 1,
  current_page: 1,
};

export default function NoticeList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  return (
    <S.Container>
      <S.Heading>공지사항 목록</S.Heading>
      <S.ModalWrap>
        <CustomForm.Modal
          buttonText="글쓰기"
          title="글쓰기"
          width={900}
          footer={null}
          onClick={() => navigate('/notice/write')}
        >
          .
        </CustomForm.Modal>
      </S.ModalWrap>
      {temp && (
        <CustomTable
          data={temp.notices}
          pagination={{
            current: page,
            onChange: setPage,
            total: temp.total_page,
          }}
          columnSize={[10, 40, 15, 15]}
        />
      )}
    </S.Container>
  );
}
