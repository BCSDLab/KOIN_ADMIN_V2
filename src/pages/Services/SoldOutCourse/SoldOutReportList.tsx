import { useState } from 'react';
import type { SoldOutProcessType } from 'model/soldOutReport.model';
import SoldOutReportCard from './SoldOutReportCard';
import MOCK_SOLD_OUT_REPORTS from './mockSoldOutReports';
import * as S from './SoldOutReportList.style';

export default function SoldOutReportList() {
  const [reports, setReports] = useState(MOCK_SOLD_OUT_REPORTS);
  const [onlyPending, setOnlyPending] = useState(false);

  const handleFilterChange = () => {
    setOnlyPending((prev) => !prev);
  };

  const handleProcess = (id: number, processType: SoldOutProcessType) => {
    setReports((prev) => prev.map((report) => (
      report.id === id
        ? {
          ...report,
          report_status: 'CONFIRMED',
          process_type: processType,
          processor: '나',
          processed_at: new Date().toISOString(),
        }
        : report
    )));
  };

  const visibleReports = onlyPending
    ? reports.filter((report) => report.report_status === 'PENDING')
    : reports;

  return (
    <S.Container>
      <S.Heading>식단 품절 제보 관리</S.Heading>
      <S.StyledCheckbox
        checked={onlyPending}
        onChange={handleFilterChange}
      >
        미처리 제보만 모아보기
      </S.StyledCheckbox>
      <S.DataContainer>
        {visibleReports.map((report) => (
          <SoldOutReportCard
            report={report}
            key={report.id}
            onProcess={handleProcess}
          />
        ))}
      </S.DataContainer>
    </S.Container>
  );
}
