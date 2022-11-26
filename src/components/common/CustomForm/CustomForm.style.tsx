import {
  Button, Form, Input,
} from 'antd';
import styled from 'styled-components';

export const GridWrap = styled.div<{ gridColumns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.gridColumns};
`;

export const FormItem = styled(Form.Item)`
  margin-bottom: 0;
  .ant-form-item-label > label {
    width: 120px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    color: #2c3e50;
    background-color: rgb(243, 243, 243);
    border: rgb(217, 217, 217) solid;
    border-width: 1px;
    border-radius: 0;
    &:after {
      display: none;
    }
  }
`;

export const FormItemCheckbox = styled(Form.Item)``;

export const StyledInput = styled(Input)`
  border: rgb(217, 217, 217) solid;
  border-width: 1px;
  border-radius: 0;
  display: inline-block;
  transition: none;
  appearance: none;
`;

export const StyledButton = styled(Button)`
  border-radius: 0;
  width: 80px;
`;
