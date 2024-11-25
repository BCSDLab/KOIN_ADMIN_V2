import { Card } from 'antd';
import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const HistoryArea = styled(Card)`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 5;
  width: 300px;
  height: 110px;
  overflow: auto;
  border: none;

  .ant-card-body {
    padding: 0;
  }
`;
