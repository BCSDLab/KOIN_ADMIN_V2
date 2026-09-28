import styled from 'styled-components';
import { Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export * from 'styles/ReportCard.style';

export const StatusBadge = styled.span<{ isPending: boolean }>`
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => (props.isPending ? '#c0392b' : '#1890ff')};
`;

export const ProcessText = styled.span`
  font-size: 14px;
  color: #404040;
`;

export const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #404040;
  margin-top: 4px;
`;

export const PopoverHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
`;

export const PopoverClose = styled(CloseOutlined)`
  cursor: pointer;
  font-size: 12px;
  color: #888;
`;

export const StyledSelect = styled(Select)`
  width: 180px;
  .ant-select-selection-placeholder {
    color: #000000ff;
  }
` as typeof Select;
