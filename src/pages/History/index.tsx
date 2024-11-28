import { Flex, Pagination } from 'antd';
import { useState } from 'react';
import { useGetHistorysQuery } from 'store/api/history';
import * as S from './History.style';

export default function History() {
  const [page, setPage] = useState<number>(1);

  const { data: historys } = useGetHistorysQuery({ page });
  const pagination = {
    current: page,
    onChange: setPage,
    total: historys ? historys.total_page : 0,
  };
  const historyList = historys ? historys.historys : [];

  return (
    <Flex vertical>
      <S.Heading>로그 히스토리</S.Heading>
      <S.HistoryContainer>
        {
          historyList.map((history) => (
            <S.HistoryItem>
              {`${history.created_at}. ${history.domain_name} ${history.request_method} (${history.name})`}
            </S.HistoryItem>
          ))
        }
      </S.HistoryContainer>
      {pagination && pagination.total > 0 && (
        <Pagination
          current={pagination.current}
          total={pagination.total * 10}
          onChange={pagination.onChange}
          showSizeChanger={false}
          showQuickJumper
          align="center"
        />
      )}
    </Flex>
  );
}
