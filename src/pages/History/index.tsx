import { Flex, Pagination } from 'antd';
import { useState } from 'react';
import { useGetHistoriesQuery } from 'store/api/history';
import * as S from './History.style';

export default function History() {
  const [page, setPage] = useState<number>(1);

  const { data: histories } = useGetHistoriesQuery({ page });
  const pagination = {
    current: page,
    onChange: setPage,
    total: histories ? histories.total_page : 0,
  };
  const historyList = histories ? histories.histories : [];

  const parseRequestMessage = (domainName: string, message: string) => {
    if (message === '') return '';

    const domainPropertyMap: { [key: string]: string } = {
      상점: 'name',
      메뉴: 'name',
      '상점 카테고리': 'name',
      버전관리: 'version',
      'AB 테스트': 'display_title',
      '코인 공지': 'title',
    };
    const messageObject = JSON.parse(message);

    const property = domainPropertyMap[domainName];

    return property ? messageObject[property] : '';
  };

  return (
    <Flex vertical>
      <S.Heading>로그 히스토리</S.Heading>
      <S.HistoryContainer>
        {
          historyList.map((history) => (
            <S.HistoryItem key={history.id}>
              {`${history.created_at}. ${history.domain_name} ${parseRequestMessage(history.domain_name, history.request_message)} ${history.request_method} (${history.name})`}
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
