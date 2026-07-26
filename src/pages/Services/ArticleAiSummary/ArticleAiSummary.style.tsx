import { styled } from 'styled-components';

export * from 'styles/List.style';

export const OverviewCardWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin: 24px 0;
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const TableWrapper = styled.div`
  .ant-table-cell {
    max-width: none !important;
  }
`;
