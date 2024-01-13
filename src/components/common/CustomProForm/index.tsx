import {
  ProFormText, ProForm, ProFormList,
} from '@ant-design/pro-components';
import { ReactNode } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Width } from 'model/menus.model';

type IconProps = { Icon?: React.FC<any>; tooltipText?: string; };
interface CustomProFormListProps {
  name: string | (string | number)[];
  creatorButtonProps: {
    creatorButtonText: string,
    style: { width: Width },
  } | false;
  min: number;
  initialValue?: any[];
  creatorRecord?: Record<string, any>;
  deleteIconProps: IconProps | false;
  copyIconProps: IconProps | false;
  itemRender: (props: { listDom: ReactNode; action: ReactNode }, index: any) => ReactNode;
  children: ReactNode;
}

function CustomProFormList({
  name,
  creatorButtonProps,
  min,
  initialValue,
  creatorRecord,
  deleteIconProps,
  copyIconProps,
  itemRender,
  children,
}: CustomProFormListProps) {
  return (
    <ProFormList
      name={name}
      creatorButtonProps={creatorButtonProps}
      min={min}
      initialValue={initialValue}
      creatorRecord={creatorRecord}
      deleteIconProps={deleteIconProps}
      copyIconProps={copyIconProps}
      itemRender={itemRender}
    >
      {children}
    </ProFormList>
  );
}
interface CustomProFormTextProps {
  name: NamePath;
  width: Width;
  placeholder: string | any;
  disabled?: boolean;
  initialValue?: string;
}

function CustomProFormText({
  name, width, placeholder, disabled, initialValue,
}: CustomProFormTextProps) {
  return (
    <div style={{ display: 'flex' }}>
      <ProFormText
        name={name}
        width={width}
        placeholder={placeholder}
        disabled={disabled}
        initialValue={initialValue}
      />
    </div>
  );
}

const CustomProForm = Object.assign(ProForm, {
  List: CustomProFormList,
  Text: CustomProFormText,
});

export default CustomProForm;
