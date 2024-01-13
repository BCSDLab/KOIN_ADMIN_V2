/* eslint-disable react-hooks/rules-of-hooks */
import CustomForm from 'components/common/CustomForm';
import { Card } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { MenuCategory } from 'model/menus.model';
import { useState } from 'react';
import EditMenuModal from './MenuDetailForm';
// import * as S from './StoreMenus.style';

export default function StoreMenus({ form }: { form: FormInstance }) {
  const menus: MenuCategory[] = form.getFieldValue('menu_categories');
  const [menuId, setMenuId] = useState<number>();

  console.log(menus);

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  const onClick = (id: number) => {
    setMenuId(id);
  };

  return (
    <CustomForm
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      onFinish={onFinish}
      style={{ maxWidth: '746px' }}
      autoComplete="off"
      initialValues={{ items: menus[0].menus }}
    >
      <CustomForm.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <>
                <DeleteOutlined onClick={() => { remove(field.name); }} />
                <Card
                  size="small"
                  title={menus[0].menus[field.name].name}
                  key={field.key}
                  extra={(
                    <PlusCircleOutlined onClick={() => onClick(menus[0].menus[field.name].id)} />
                )}
                >
                  {menus[0].menus[field.name].id === menuId
                    ? <EditMenuModal menuId={menuId} /> : null}
                </Card>

              </>
            ))}

            <CustomForm.Button type="dashed" onClick={() => add()} block>
              + 메뉴 추가
            </CustomForm.Button>
          </div>
        )}
      </CustomForm.List>
    </CustomForm>
  );
}
