import styled from 'styled-components';

export * from 'styles/ReportCard.style';

export const StatusBadge = styled.span<{ isPending: boolean }>`
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => (props.isPending ? '#000' : '#1890ff')};
`;

export const ProcessText = styled.span<{ processType: 'APPROVE' | 'REJECT' | null }>`
  font-size: 14px;
  color: ${(props) => (props.processType === 'REJECT' ? '#ff0000' : '#175C8f')};
`;
