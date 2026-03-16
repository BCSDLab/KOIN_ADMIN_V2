import { useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import callvanQueries from 'queryFactory/callvanQueries';
import CallvanCard from './CallvanCard';
import * as S from './CallvanList.style';

const LIMIT = 10;

export default function CallvanList() {
  const [page, setPage] = useState(1);
  const [onlyPending, setOnlyPending] = useState(false);

  const { data, isLoading } = useQuery(callvanQueries.callvanList({
    page,
    limit: LIMIT,
    only_pending: onlyPending,
  }));

  const handleFilterChange = () => {
    setOnlyPending((prev) => !prev);
    setPage(1);
  };

  return (
    <S.Container>
      <S.Heading>콜밴팟 사용자 관리</S.Heading>
      {isLoading ? [1, 2, 3, 4, 5].map((key) => <Skeleton key={key} active />) : (
        <>
          <S.StyledCheckbox
            checked={onlyPending}
            onChange={handleFilterChange}
          >
            미처리 신고만 모아보기
          </S.StyledCheckbox>
          <S.DataContainer>
            {data && data.reports.map((report) => (
              <CallvanCard
                report={report}
                key={report.id}
                param={{ page, limit: LIMIT, only_pending: onlyPending }}
              />
            ))}
            {data && (
              <Pagination
                total={data.total_count}
                current={page}
                onChange={(num) => setPage(num)}
                showSizeChanger={false}
              />
            )}
          </S.DataContainer>
        </>
      )}
    </S.Container>
  );
}
