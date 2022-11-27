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
  .ant-input-borderless:hover, 
  .ant-input-borderless:focus, 
  .ant-input-borderless-focused, 
  .ant-input-borderless-disabled, 
  .ant-input-borderless[disabled] {
    border: rgb(217, 217, 217) solid;
    border-width: 1px;
  }

  .ant-input-borderless-disabled, 
  .ant-input-borderless[disabled] {
    background: #f5f5f5;
  }

  .ant-form-item-explain-error{
    position: absolute;
    right: 12px;
    z-index: 10;
    top: 5px;
  }
`;

export const FormItemCheckbox = styled(Form.Item)``;

export const StyledInput = styled(Input)`
  border: rgb(217, 217, 217) solid;
  border-width: 1px;
  border-radius: 0;
  display: inline-block;
`;

export const StyledButton = styled(Button)`
  border-radius: 0;
  width: 80px;
`;
