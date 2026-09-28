import styled from 'styled-components';
import { Image } from 'antd';

export const Container = styled.div<{ isPending: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 14px 20px;
  background: ${(props) => (props.isPending ? '#ffafaf' : '#effbff')};
  border: ${(props) => (props.isPending ? 'none' : '2px solid #effbff')};
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

export const StyledImage = styled(Image)`
  .ant-image-img {
    object-fit: cover;
    border-radius: 8px;
  }
` as typeof Image;

export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px 0 0;
`;
