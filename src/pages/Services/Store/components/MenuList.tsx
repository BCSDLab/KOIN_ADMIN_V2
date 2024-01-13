/* eslint-disable react-hooks/rules-of-hooks */
import CustomForm from 'components/common/CustomForm';
import { Card } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { useParams } from 'react-router-dom';
import { useGetMenusListQuery } from 'store/api/storeMenu';
import { useState } from 'react';
import * as S from './MenuList.style';
import EditMenuModal from './MenuDetailForm';

export default function MenuList({ form }: { form: FormInstance }) {
  const { id } = useParams();
  const { data: storeMenusData } = useGetMenusListQuery(Number(id));
  const [menuId, setMenuId] = useState<number>();
  const menuList = storeMenusData?.menu_categories[0];

  // const onFinish = (values: any) => {
  //   console.log('Received values of form:212', values);
  // };

  const onClick = (clickMenuId: number) => {
    setMenuId(clickMenuId);
  };

  return (
    <S.Wrap>
      { menuList && (
      <CustomForm
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        autoComplete="off"
        initialValues={menuList}
      >
        <CustomForm.List name="menus">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <S.CardWrap $id={menuList.menus[field.name].id} $menuId={menuId}>
                  <Card
                    size="small"
                    title={menuList.menus[field.name].name}
                    key={field.key}
                    extra={(
                      <PlusCircleOutlined onClick={() => onClick(menuList.menus[field.name].id)} />
                )}
                  >
                    {menuList.menus[field.name].id === menuId
                      ? <EditMenuModal menuId={menuId} /> : null}
                  </Card>
                  <DeleteOutlined onClick={() => { remove(field.name); }} />
                </S.CardWrap>
              ))}

              <CustomForm.Button type="dashed" onClick={() => add()} block>
                + 메뉴 추가
              </CustomForm.Button>
            </div>
          )}
        </CustomForm.List>
      </CustomForm>
      )}
    </S.Wrap>
  );
}
