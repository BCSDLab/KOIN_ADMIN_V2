import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { Button, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { useGetNoticeListQuery } from 'store/api/notice';
import * as S from './NoticeList.style';

const ActionBar = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function NoticeList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);
  const { data: noticesResponse } = useGetNoticeListQuery({
    page,
    is_deleted: showDeleted,
  });

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
