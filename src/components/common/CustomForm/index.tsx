import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, CheckboxProps, Form,
  Input, InputNumberProps, InputProps,
  Modal, ModalProps, Select, Switch, SwitchProps,
} from 'antd';
import { ReactNode, forwardRef } from 'react';
import { Rule } from 'antd/lib/form';
import useValidate from 'utils/hooks/useValidate';
import { NamePath } from 'antd/lib/form/interface';
import { Editor, EditorProps, Viewer } from '@toast-ui/react-editor';
import * as S from './CustomForm.style';
import CustomMultipleUpload from './CustomMultipleUpload';
import CustomSingleUpload from './CustomSingleUpload';

interface GridProps {
  children: ReactNode;
  gridColumns: string;
}

function GridRow({ children, gridColumns }: GridProps) {
  return <S.GridWrap gridColumns={gridColumns}>{children}</S.GridWrap>;
}

interface CustomFormItemProps {
  label: string;
  name: NamePath;
  disabled?: boolean;
  rules?: Rule[];
}

function CustomInput({
  label, name, rules, disabled, ...args
}: CustomFormItemProps & Omit<InputProps, 'name'>) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInput disabled={disabled} {...args} />
    </S.FormItem>
  );
}

function CustomInputNumber({
  label, name, rules, disabled, ...args
}: CustomFormItemProps & Omit<InputNumberProps, 'name'>) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInputNumber controls={false} disabled={disabled} {...args} />
    </S.FormItem>
  );
}

interface CustomTextAreaProps {
  maxLength?: number;
}

function CusctomTextArea({
  label, name, maxLength, disabled, rules,
}: CustomFormItemProps & CustomTextAreaProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <Input.TextArea showCount maxLength={maxLength} disabled={disabled} />
    </S.FormItem>
  );
}

interface CustomCheckboxProps {
  name: NamePath;
  children?: ReactNode;
  disabled?: boolean;
}

function CustomCheckbox({
  name,
  children,
  disabled,
  onChange,
}: CustomCheckboxProps & Omit<CheckboxProps, 'name'>) {
  return (
    <S.FormItemCheckbox name={name} valuePropName="checked">
      <Checkbox disabled={disabled} onChange={onChange}>
        {children}
      </Checkbox>
    </S.FormItemCheckbox>
  );
}

interface CustomButtonProps {
  children: string;
  danger?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  htmlType?: 'button' | 'submit' | 'reset';
  type?: 'link' | 'text' | 'default' | 'dashed' | 'primary';
  block?: boolean;
  disabled?: boolean;
}

function CustomButton({
  children,
  danger,
  icon,
  onClick,
  htmlType,
  type,
  block,
  disabled,
}: CustomButtonProps) {
  return (
    <S.FormItem>
      <S.StyledButton
        htmlType={htmlType}
        type={type}
        danger={danger}
        icon={icon}
        onClick={onClick}
        block={block}
        disabled={disabled}
      >
        {children}
      </S.StyledButton>
    </S.FormItem>
  );
}

function CustomSelect({
  options, label, name, rules, disabled,
}: CustomFormItemProps & {
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
}: CustomFormItemProps & SwitchProps) {
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
  isDelete?: boolean;
}

function CustomModal({
  buttonText, title, width, footer, children, open, onCancel, onClick, isDelete,
}: CustomModalProps & ModalProps) {
  return (
    <>
      <Button
        icon={isDelete
          ? <MinusOutlined />
          : <PlusOutlined />}
        onClick={onClick}
      >
        {buttonText}
      </Button>
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

export const CustomEditor = forwardRef<Editor, CustomFormItemProps & EditorProps>((
  {
    label, name, rules, ...props
  },
  ref,
) => {
  return (
    <S.TextWrap>
      <S.FormTextItem label={label} name={name} rules={rules}>
        <Editor {...props} ref={ref} />
      </S.FormTextItem>
    </S.TextWrap>

  );
});

export const CustomViewer = forwardRef<Viewer, CustomFormItemProps & EditorProps>((
  {
    label, name, rules, ...props
  },
  ref,
) => {
  return (
    <S.TextWrap>
      <S.FormTextItem label={label} name={name} rules={rules}>
        <Viewer {...props} ref={ref} />
      </S.FormTextItem>
    </S.TextWrap>

  );
});

CustomEditor.displayName = 'CustomEditor';

const CustomForm = Object.assign(Form, {
  GridRow,
  Button: CustomButton,
  Input: CustomInput,
  InputNumber: CustomInputNumber,
  TextArea: CusctomTextArea,
  MultipleUpload: CustomMultipleUpload,
  SingleUpload: CustomSingleUpload,
  Checkbox: CustomCheckbox,
  Select: CustomSelect,
  Switch: CustomSwitch,
  Modal: CustomModal,
  useValidate,
  Editor: CustomEditor,
  Viewer: CustomViewer,
});

export default CustomForm;
