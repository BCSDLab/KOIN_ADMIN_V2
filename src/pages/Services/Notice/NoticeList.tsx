import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { Button, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import noticeQueries from 'queryFactory/noticeQueries';
import * as S from './NoticeList.style';

export default function NoticeList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);

  const { data: noticesResponse } = useQuery(noticeQueries.noticeList({
    page,
    is_deleted: showDeleted,
  }));

  return (
    <S.Container>
      <S.Heading>공지사항 목록</S.Heading>
      <S.ActionBar>
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
      </S.ActionBar>
      {noticesResponse && (
        <CustomTable
          data={noticesResponse.notices}
          pagination={{
            current: page,
            onChange: setPage,
            total: noticesResponse.total_page,
          }}
          columnSize={[10, 50, 10, 15]}
          hiddenColumns={['id']}
        />
      )}
    </S.Container>
  );
}
