import {
  ProFormText, ProForm, ProFormList,
} from '@ant-design/pro-components';
// SubmitterProps,
import { ReactNode } from 'react';
import { NamePath } from 'antd/lib/form/interface';
import { Menu } from 'model/menus.model';

// interface CustomProFormWrapProps {
//   layout?: 'horizontal' | 'vertical' | 'inline';
//   submitter?: SubmitterProps;
//   children: ReactNode;
// }

// function CustomProForm({
//   layout, submitter, children,
// }: CustomProFormWrapProps) {
//   return (
//     <ProForm
//       layout={layout}
//       submitter={submitter}
//     >
//       {children}
//     </ProForm>
//   );
// }

interface CustomProFormListProps {
  name: string;
  creatorButtonProps: {
    creatorButtonText: string,
    style: { width: number | 'sm' | 'md' | 'lg' | 'xl' | 'lg' | 'xs' },
  };
  min: number;
  initialValue?: Menu[] | undefined;
  creatorRecord?: Record<string, any>;
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
  List: CustomProFormList,
});

export default CustomProForm;
