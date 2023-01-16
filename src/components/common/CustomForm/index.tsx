import { PlusOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, Form,
  Input, InputNumberProps, InputProps,
  Modal, ModalProps, Select, Switch, SwitchProps,
} from 'antd';
import React, { ReactNode } from 'react';
import { Rule } from 'antd/lib/form';
import * as S from './CustomForm.style';
import CustomUpload from './CustomUpload';

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

function CustomInputNumber({
  label, name, rules, disabled, ...args
}: FormItemProps & InputNumberProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInputNumber controls={false} disabled={disabled} {...args} />
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

function CustomSwitch({
  name, checkedChildren, unCheckedChildren, label, ...args
}: FormItemProps & SwitchProps) {
  return (
    <S.SwitchWrap>
      {`${label} `}
      <S.FormItem name={name} valuePropName="checked">
        <Switch checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} {...args} />
      </S.FormItem>
    </S.SwitchWrap>
  );
}

interface CustomModalProps {
  onClick: () => void;
  buttonText: string;
  children: ReactNode;
}

function CustomModal({
  buttonText, title, width, footer, children, open, onCancel, onClick,
}: CustomModalProps & ModalProps) {
  return (
    <>
      <Button icon={<PlusOutlined />} onClick={onClick}>{buttonText}</Button>
      <Modal
        title={title}
        open={open}
        onCancel={onCancel}
        centered
        width={width}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
}

const CustomForm = Object.assign(Form, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  InputNumber: CustomInputNumber,
  TextArea: CusctomTextArea,
  Upload: CustomUpload,
  Checkbox: CustomCheckbox,
  Select: CustomSelect,
  Switch: CustomSwitch,
  Modal: CustomModal,
});

export default CustomForm;
