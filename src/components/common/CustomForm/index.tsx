/* eslint-disable react/require-default-props */
import { UploadOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form, Input, InputProps, Select, Upload,
} from 'antd';
import React, { ReactNode } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { Rule } from 'antd/lib/form';
import * as S from './CustomForm.style';

interface GridProps {
  children: ReactNode;
  gridColumns: string;
}

function GridRow({ children, gridColumns }: GridProps) {
  return <S.GridWrap gridColumns={gridColumns}>{children}</S.GridWrap>;
}

interface FormItemProps {
  label: string;
  name: string;
  disabled?: boolean;
  rules?: Rule[];
}

function CustomInput({
  label, name, rules, disabled, ...args
}: FormItemProps & InputProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInput disabled={disabled} {...args} />
    </S.FormItem>
  );
}

interface TextAreaProps {
  maxLength?: number;
}

function CusctomTextArea({
  label, name, maxLength, disabled, rules,
}: FormItemProps & TextAreaProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <Input.TextArea showCount maxLength={maxLength} disabled={disabled} />
    </S.FormItem>
  );
}

interface CheckboxProps {
  name: string;
  children: ReactNode;
  disabled?: boolean;
}

function CustomCheckbox({
  name,
  children,
  disabled,
}: CheckboxProps) {
  return (
    <S.FormItemCheckbox name={name} valuePropName="checked">
      <Checkbox disabled={disabled}>
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

interface ButtonProps {
  children: string;
  danger?: boolean;
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: 'button' | 'submit' | 'reset';
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

function CustomSelect({
  options, label, name, rules, disabled,
}: FormItemProps & {
  options: Record<string, string>
}) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <Select disabled={disabled}>
        {Object.entries(options).map(([key, val]) => (
          <Select.Option value={Number.isNaN(Number(key)) ? key : Number(key)} key={key}>
            {val}
          </Select.Option>
        ))}
      </Select>
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
  Select: CustomSelect,
});

export default CustomForm;
