import {
  Button, Form, Input,
} from 'antd';
import styled from 'styled-components';

export const GridWrap = styled.div<{ gridColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.gridColumns};
`;

export const FormItem = styled(Form.Item)`
  margin-left: 25px;
  margin-bottom: 60px;
  .ant-form-item-label > label {
    font-size: 15px;
    font-weight: 600;
    color: #2c3e50;
  }
`;

export const FormItemCheckbox = styled(Form.Item)``;

export const StyledInput = styled(Input)`
  border-radius: 7px;
`;

export const StyledButton = styled(Button)`
`;
