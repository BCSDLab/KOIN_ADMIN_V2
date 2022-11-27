/* eslint-disable react/require-default-props */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, Upload,
} from 'antd';
import { RoomOptionValue } from 'constant/roomOption';
import React, { ChangeEvent, ReactNode } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { Rule } from 'antd/lib/form';
import * as S from './CustomForm.style';

interface InputProps {
  label: string;
  name: string;
  disabled?: boolean;
  rules?: Rule[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface TextAreaProps {
  label: string;
  name: string;
  maxLength?: number;
}

interface GridProps {
  children: ReactNode;
  gridColumns: string;
}

interface ButtonProps {
  children: string;
  danger?: boolean;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'button' | 'submit' | 'reset';
}

interface CheckboxProps {
  res: RoomOptionValue;
  children: ReactNode;
}

function GridRow({ children, gridColumns }: GridProps) {
  return <S.GridWrap gridColumns={gridColumns}>{children}</S.GridWrap>;
}

function CustomInput({
  label, name, disabled, rules, onChange,
}: InputProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInput disabled={disabled} bordered={false} onChange={onChange} />
    </S.FormItem>
  );
}

function CusctomTextArea({ label, name, maxLength }: TextAreaProps) {
  return (
    <S.FormItem label={label} name={name}>
      <Input.TextArea showCount maxLength={maxLength} />
    </S.FormItem>
  );
}

function CustomCheckbox({
  res,
  children,
}: CheckboxProps) {
  return (
    <S.FormItemCheckbox name={res.data} valuePropName="checked">
      <Checkbox>
        {children}
      </Checkbox>
    </S.FormItemCheckbox>
  );
}

function CustomUpload({ defaultFileList: fileList }: { defaultFileList: UploadFile[] }) {
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
  children,
  danger,
  icon,
  onClick,
  htmlType,
}: ButtonProps) {
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

const CustomForm = Object.assign(Form, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  TextArea: CusctomTextArea,
  Upload: CustomUpload,
  Checkbox: CustomCheckbox,
});

export default CustomForm;
