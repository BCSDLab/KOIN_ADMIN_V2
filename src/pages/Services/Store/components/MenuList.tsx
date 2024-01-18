/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/rules-of-hooks */
import CustomForm from 'components/common/CustomForm';
import { Card } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { useParams } from 'react-router-dom';
import { useGetMenusListQuery } from 'store/api/storeMenu';
import { useState } from 'react';
import * as S from './MenuList.style';
import MenuDetailForm from './MenuDetailForm';
import useMenuMutation from './useMenuMutation';

export default function MenuList({ form }: { form: FormInstance }) {
  const { id } = useParams();
  const { data: storeMenusData } = useGetMenusListQuery(Number(id));
  const [menuId, setMenuId] = useState<number>();
  const menuList = storeMenusData?.menu_categories[0];
  const { deleteMenu, updateMenu } = useMenuMutation(Number(id));
  const [menuForm] = CustomForm.useForm();

  // const onFinish = (values: any) => {
  //   console.log('Received values of form:212', values);
  // };

  const handleClick = (selectedMenuId: number) => {
    if (menuId && selectedMenuId !== menuId) {
      // 서버 500에러로 테스트 불가
      updateMenu(menuId, menuForm?.getFieldsValue());
    }
    setMenuId(selectedMenuId);
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
          {(fields, { remove }) => (
            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
              {fields.map((field) => (
                <S.CardWrap $id={menuList.menus[field.name]?.id} $menuId={menuId}>
                  <Card
                    size="small"
                    title={menuList.menus[field.name].name}
                    key={field.key}
                    extra={(
                      <PlusCircleOutlined
                        onClick={() => handleClick(menuList.menus[field.name]?.id)}
                      />
                      )}
                  >
                    {menuList.menus[field.name].id === menuId
                      && <MenuDetailForm menuId={menuId} form={menuForm} /> }
                  </Card>
                  <DeleteOutlined onClick={async () => {
                    await deleteMenu(menuList.menus[field.name].id);
                    remove(field.name);
                  }}
                  />
                </S.CardWrap>
              ))}
            </div>
          )}
        </CustomForm.List>
      </CustomForm>
      )}
      {/* 새로운 메뉴 리스트 */}
      {/* <CustomForm.List name="new_menu">
        {(fields, { remove, add }) => (
          <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
            {fields.map((field) => (
              <>
                <S.CardWrap $id={field.key} $menuId={menuId}>
                  <Card
                    size="small"
                    key={field.key}
                    extra={(
                      <PlusCircleOutlined
                        onClick={() => onClick(field.key)}
                      />
                      )}
                  >
                    <MenuDetailForm />
                  </Card>
                  <DeleteOutlined onClick={() => {
                    remove(field.name);
                  }}
                  />
                </S.CardWrap>
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            ))}
          </div>
        )}
      </CustomForm.List> */}
    </S.Wrap>
  );
}
