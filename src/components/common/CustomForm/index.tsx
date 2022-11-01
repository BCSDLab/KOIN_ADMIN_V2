import { Button, Form, Input } from 'antd';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface InputValue {
  label: string;
  defaultValue: any;
}

type Grid = string | undefined | any;

interface GridValue {
  children: ReactNode;
  grid: Grid;
}

interface FormValue {
  onFinish: any;
  children: ReactNode;
}

const InputWrap = styled.div<Grid>`
  display: grid;
  grid-template-columns: ${(props) => props.grid};
`;

function GridRow({ children, grid }: GridValue) {
  return <InputWrap grid={grid}>{children}</InputWrap>;
}

function CustomInput({ label, defaultValue }: InputValue) {
  return (
    <Form.Item label={label} name={label}>
      <Input defaultValue={defaultValue} />
    </Form.Item>
  );
}

function CustomButton() {
  return (
    <Form.Item>
      <Button type="primary">Submit</Button>
    </Form.Item>
  );
}

function SubmitForm({ onFinish, children }: FormValue) {
  const [form] = Form.useForm();

  return <Form form={form} onFinish={onFinish}>{children}</Form>;
}

const CustomForm = Object.assign(SubmitForm, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
});

export default CustomForm;
