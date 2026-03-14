import styled from 'styled-components';
import { Checkbox } from 'antd';

export * from 'styles/List.style';

export const StyledCheckbox = styled(Checkbox)`
  margin: 12px 0px 0px 12px;
`;
export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-bottom: 30px;
  margin-left: 20px;
`;
