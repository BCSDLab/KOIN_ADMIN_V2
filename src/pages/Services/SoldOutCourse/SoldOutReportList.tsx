import { useState } from 'react';
import { Pagination, Skeleton } from 'antd';
import { useQuery } from '@tanstack/react-query';
import diningQueries from 'queryFactory/diningQueries';
import SoldOutReportCard from './SoldOutReportCard';
import * as S from './SoldOutReportList.style';

const LIMIT = 10;

export default function SoldOutReportList() {
  const [page, setPage] = useState(1);
  const [onlyPending, setOnlyPending] = useState(false);

  const { data, isLoading } = useQuery(diningQueries.soldOutReportList({
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
      <S.Heading>식단 품절 제보 관리</S.Heading>
      {isLoading ? [1, 2, 3, 4, 5].map((key) => <Skeleton key={key} active />) : (
        <>
          <S.StyledCheckbox
            checked={onlyPending}
            onChange={handleFilterChange}
          >
            미처리 제보만 모아보기
          </S.StyledCheckbox>
          <S.DataContainer>
            {data && data.reports.map((report) => (
              <SoldOutReportCard report={report} key={report.report_id} />
            ))}
            {data && (
              <Pagination
                total={data.total_count}
                current={page}
                pageSize={LIMIT}
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
