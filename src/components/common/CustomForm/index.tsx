/* eslint-disable react/require-default-props */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Upload,
} from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { RoomOptionValue } from 'constant/roomOption';
import React, { ReactNode } from 'react';
import * as S from './CutomForm.style';

interface InputValue {
  label: string;
  name: string;
}
interface GridValue {
  children: ReactNode;
  grid: string;
}

interface FormValue {
  onFinish: any;
  children: ReactNode;
  form: FormInstance;
  fields: any;
}

interface ButtonValue {
  children: string;
  danger: boolean;
  icon: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
}

interface CheckboxValue {
  res: RoomOptionValue;
  children: ReactNode;
  defaultValue: boolean;
  key: string | number;
  form: FormInstance;
}

function SubmitForm({
  onFinish, children, form, fields,
}: FormValue) {
  return (
    <Form
      form={form}
      onFinish={onFinish}
      fields={fields}
    >
      {children}
    </Form>
  );
}

function GridRow({ children, grid }: GridValue) {
  return <S.GridWrap grid={grid}>{children}</S.GridWrap>;
}

function CustomInput({ label, name }: InputValue) {
  return (
    <S.FormItem label={label} name={name}>
      <S.StyledInput />
    </S.FormItem>
  );
}

function CustomCheckbox({
  res, children, defaultValue, key, form,
}: CheckboxValue) {
  const onChange = (e: CheckboxChangeEvent) => {
    form.setFieldsValue({
      [e.target.id as string]: e.target.checked,
    });
  };

  return (
    <S.FormItemCheckbox key={key} name={res.data}>
      <Checkbox defaultChecked={defaultValue} onChange={onChange}>
        {children}
      </Checkbox>
    </S.FormItemCheckbox>
  );
}

function CustomUpload({ defaultFileList: fileList }: any) {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      defaultFileList={[...fileList]}
      className="upload-list-inline"
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

function CustomButton({
  children, danger, icon, onClick, htmlType,
}: ButtonValue) {
  return (
    <S.FormItem>
      <S.StyledButton
        htmlType={htmlType}
        type="primary"
        danger={danger}
        icon={icon}
        onClick={onClick}
      >
        {children}
      </S.StyledButton>
    </S.FormItem>
  );
}

const CustomForm = Object.assign(SubmitForm, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  Upload: CustomUpload,
  Checkbox: CustomCheckbox,
});

export default CustomForm;
