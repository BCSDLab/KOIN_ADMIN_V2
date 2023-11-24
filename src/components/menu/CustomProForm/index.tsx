import {
  ProFormText, ProForm, SubmitterProps, ProFormList,
} from '@ant-design/pro-components';
import { ReactNode } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Menu } from 'model/menus.model';
import * as S from './CustomProForm.style';

interface CustomProFormWrapProps {
  layout?: 'horizontal' | 'vertical' | 'inline';
  submitter?: SubmitterProps;
  children: ReactNode;
}

function CustomProFormWrap({
  layout, submitter, children,
}: CustomProFormWrapProps) {
  return (
    <S.ProFormWrap
      layout={layout}
      submitter={submitter}
    >
      {children}
    </S.ProFormWrap>
  );
}

interface CustomProFormListProps {
  name: string;
  creatorButtonProps: {
    creatorButtonText: string,
    style: { width: number | 'sm' | 'md' | 'lg' | 'xl' | 'lg' | 'xs' },
  };
  min: number;
  initialValue?: Menu[] | undefined;
  creatorRecord?:
  {
    name: string,
    singlePrice: string,
    optionPrices: [{ option: string, price: string }]
  };
  deleteIconProps: { Icon?: React.FC<any>; tooltipText?: string; } | false
  copyIconProps: { Icon?: React.FC<any>; tooltipText?: string; } | false;
  itemRender?: (props: { listDom: ReactNode; action: ReactNode }) => ReactNode;
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
      // eslint-disable-next-line react/no-unstable-nested-components
      itemRender={itemRender}
    >
      {children}
    </ProFormList>
  );
}
interface CustomProFormTextProps {
  name: NamePath;
  width: number | 'sm' | 'md' | 'lg' | 'xl' | 'lg' | 'xs';
  placeholder: string;
}

function CustomProFormText({ name, width, placeholder }: CustomProFormTextProps) {
  return (
    <ProFormText
      name={name}
      width={width}
      placeholder={placeholder}
    />
  );
}

const CustomProForm = Object.assign(ProForm, {
  Text: CustomProFormText,
  Wrap: CustomProFormWrap,
  List: CustomProFormList,
});

export default CustomProForm;
