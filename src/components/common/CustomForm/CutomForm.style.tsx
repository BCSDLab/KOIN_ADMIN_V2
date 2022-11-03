import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { Grid } from '.';

export const GridWrap = styled.div<Grid>`
  display: grid;
  grid-template-columns: ${(props) => props.grid};
`;

export const FormItem = styled(Form.Item)`
  margin-left: 25px;
  margin-bottom: 50px;
  .ant-form-item-label > label {
    font-size: 15px;
    font-weight: 600;
    color: rgb(44 62 80);
  }
`;

export const StyledInput = styled(Input)`
  border-radius: 7px;
`;

export const StyledButton = styled(Button)``;
