import styled from 'styled-components';
import { Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export const Container = styled.div<{ isPending: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  background: ${(props) => (props.isPending ? '#ffafaf' : '#ffffff')};
  border: ${(props) => (props.isPending ? 'none' : '2px solid #1890ff')};
  border-radius: 10px;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatusBadge = styled.span<{ isPending: boolean }>`
  font-weight: 700;
  font-size: 15px;
  color: ${(props) => (props.isPending ? '#c0392b' : '#1890ff')};
`;

export const BadgeCount = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #404040;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfoGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const InfoItem = styled.span`
  font-size: 14px;
  color: #404040;
`;

export const Label = styled.span`
  font-weight: 600;
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

export const SectionContent = styled.div`
  font-size: 14px;
  color: #606060;
  line-height: 1.6;
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const AttachImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
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
  .ant-select-selection-placeholder {
    color: #000000ff;
  }
` as typeof Select;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px 0 0;
`;
