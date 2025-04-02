import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {
  Button, Checkbox, CheckboxProps, Form,
  Input, InputNumberProps, InputProps,
  Modal, ModalProps, Select, Switch, SwitchProps,
} from 'antd';
import { ReactNode, forwardRef } from 'react';
import { Rule } from 'antd/lib/form';
import { NamePath } from 'antd/lib/form/interface';
import { Editor, EditorProps, Viewer } from '@toast-ui/react-editor';
import { TextAreaProps } from 'antd/lib/input';
import * as S from './CustomForm.style';
import CustomMultipleUpload from './CustomMultipleUpload';
import CustomSingleUpload from './CustomSingleUpload';
import CustomSingleImageUpload from './CustomSingleImageUpload';

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
  dependencies?: NamePath[];
}

function validateUtils() {
  const required = () => ({ required: true, message: '필수 항목입니다' });
  const max = (maxLength: number) => ({ max: maxLength, message: `최대 ${maxLength}자 이내로 입력해주세요` });
  const min = (minLength: number) => ({ min: minLength, message: `최소 ${minLength}자 이내로 입력해주세요` });
  const pattern = (RegExp: RegExp, message: string) => ({ pattern: RegExp, message });

  return {
    required, max, min, pattern,
  };
}

function CustomInput({
  label, name, rules, dependencies, ...args
}: CustomFormItemProps & Omit<InputProps, 'name'>) {
  return (
    <S.FormItem label={label} name={name} rules={rules} dependencies={dependencies}>
      <S.StyledInput {...args} />
    </S.FormItem>
  );
}

function CustomInputNumber({
  label, name, rules, ...args
}: CustomFormItemProps & Omit<InputNumberProps, 'name'>) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <S.StyledInputNumber controls={false} {...args} />
    </S.FormItem>
  );
}

function CustomTextArea({
  label, name, rules, ...args
}: CustomFormItemProps & TextAreaProps) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <Input.TextArea {...args} />
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
  options, label, name, rules, selectProps, ...args
}: CustomFormItemProps & {
  options: Record<string, string>
  selectProps?: React.ComponentProps<typeof Select>;
}) {
  return (
    <S.FormItem label={label} name={name} rules={rules}>
      <Select {...selectProps}>
        {Object.entries(options).map(([key, val]) => (
          <Select.Option value={Number.isNaN(Number(key)) ? key : Number(key)} key={key} {...args}>
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
  hasIcon?: boolean
  isDelete?: boolean;
}

function CustomModal({
  buttonText, title, width, footer, children, open, onCancel, onClick, hasIcon = true, isDelete,
}: CustomModalProps & ModalProps) {
  return (
    <>
      <Button
        icon={hasIcon
          && (isDelete ? <MinusOutlined /> : <PlusOutlined />)}
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
        <S.ViewerWrap>
          <Viewer {...props} ref={ref} />
        </S.ViewerWrap>
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
  TextArea: CustomTextArea,
  MultipleUpload: CustomMultipleUpload,
  SingleUpload: CustomSingleUpload,
  SingleImageUpload: CustomSingleImageUpload,
  Checkbox: CustomCheckbox,
  Select: CustomSelect,
  Switch: CustomSwitch,
  Modal: CustomModal,
  validateUtils,
  Editor: CustomEditor,
  Viewer: CustomViewer,
});

export default CustomForm;
