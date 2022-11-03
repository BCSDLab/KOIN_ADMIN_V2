import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Form, Upload,
} from 'antd';
import React, { ReactNode } from 'react';
import * as S from './CutomForm.style';

interface InputValue {
  label: string;
  defaultValue: any;
}

export type Grid = string | undefined | any;

interface GridValue {
  children: ReactNode;
  grid: Grid;
}

interface FormValue {
  onFinish: any;
  children: ReactNode;
}

function SubmitForm({ onFinish, children }: FormValue) {
  const [form] = Form.useForm();

  return <Form form={form} onFinish={onFinish}>{children}</Form>;
}

function GridRow({ children, grid }: GridValue) {
  return <S.GridWrap grid={grid}>{children}</S.GridWrap>;
}

function CustomInput({ label, defaultValue }: InputValue) {
  return (
    <S.FormItem label={label} name={label}>
      <S.StyledInput defaultValue={defaultValue} />
    </S.FormItem>
  );
}

function CustomButton() {
  return (
    <S.FormItem>
      <S.StyledButton type="primary">Submit</S.StyledButton>
    </S.FormItem>
  );
}

function CustomUpload({ defaultFileList: fileList }: any) {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

const CustomForm = Object.assign(SubmitForm, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  Upload: CustomUpload,
});

export default CustomForm;
