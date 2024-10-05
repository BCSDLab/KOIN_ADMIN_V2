import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { Button, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import * as S from './NoticeList.style';

const ActionBar = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

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
  const [showDeleted, setShowDeleted] = useState(false);

  return (
    <S.Container>
      <S.Heading>공지사항 목록</S.Heading>
      <ActionBar>
        <S.SwitchWrapper>
          <Switch
            onClick={setShowDeleted}
            checked={showDeleted}
            checkedChildren="trash"
            unCheckedChildren="trash"
          />
        </S.SwitchWrapper>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate('/notice/write')}
        >
          글쓰기
        </Button>
      </ActionBar>
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
