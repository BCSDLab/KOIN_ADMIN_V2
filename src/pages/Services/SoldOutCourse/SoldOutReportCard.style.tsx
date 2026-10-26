import styled from 'styled-components';
import type { SoldOutReportStatus } from 'model/dining.model';

export * from 'styles/ReportCard.style';

const STATUS_COLOR: Record<SoldOutReportStatus, string> = {
  PENDING: '#000',
  APPROVED: '#1890ff',
  REJECTED: '#c0392b',
};

export const StatusBadge = styled.span<{ status: SoldOutReportStatus }>`
  font-weight: 500;
  font-size: 15px;
  color: ${(props) => STATUS_COLOR[props.status]};
`;

export const ProcessingBadge = styled.span<{ isPending: boolean }>`
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => (props.isPending ? '#000' : '#1890ff')};
`;

export const SlackNotice = styled.div`
  text-align: right;
  font-size: 13px;
  color: #888;
`;
