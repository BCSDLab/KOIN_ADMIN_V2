/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/rules-of-hooks */
import CustomForm from 'components/common/CustomForm';
import { Card, Divider } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetMenusListQuery } from 'store/api/storeMenu';
import { useState } from 'react';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import useBooleanState from 'utils/hooks/useBoolean';
import * as S from './MenuList.style';
import MenuDetailForm from './MenuDetailForm';
import useMenuMutation from './useMenuMutation';
import AddMenuForm from './AddMenuForm';

export default function MenuList() {
  const { id } = useParams();
  const { data: storeMenusData } = useGetMenusListQuery(Number(id));
  const [menuId, setMenuId] = useState<number>();
  const defaultMenuList = storeMenusData?.menu_categories ?? [];
  const { deleteMenu, updateMenu } = useMenuMutation(Number(id));
  const [menuForm] = CustomForm.useForm();
  const { value: isVisible, changeValue: chagneIsVisible } = useBooleanState();

  const handleClick = (selectedMenuId: number) => {
    if (menuId && selectedMenuId) {
      updateMenu(menuId, menuForm?.getFieldsValue());
    }
    if (selectedMenuId === menuId) {
      setMenuId(undefined);
      return;
    }
    setMenuId(selectedMenuId);
  };

  return (
    <S.Wrap>
      {defaultMenuList.map((menuList) => {
        return (
          <>
            <Divider>
              {menuList.name}
            </Divider>
            <CustomForm
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              autoComplete="off"
              fields={getDefaultValueArr(menuList)}
            >
              <CustomForm.List name="menus">
                {(menus, { remove }) => (
                  <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                    {menus.map((field) => (
                      <S.CardWrap
                        $id={menuList.menus[field?.name].id}
                        $menuId={menuId}
                        key={field.key}
                      >
                        <Card
                          size="small"
                          title={menuList.menus[field?.name].name}
                          key={field.key}
                          extra={(
                            <PlusCircleOutlined
                              onClick={() => handleClick(menuList.menus[field.name]?.id)}
                            />
                        )}
                        >
                          {menuList.menus[field?.name].id === menuId
                          && <MenuDetailForm menuId={menuId} form={menuForm} />}
                        </Card>
                        <DeleteOutlined
                          onClick={async () => {
                            await deleteMenu(menuList?.menus[field.name].id);
                            remove(field.name);
                          }}
                          style={{ marginTop: 12 }}
                        />
                      </S.CardWrap>
                    ))}
                  </div>
                )}
              </CustomForm.List>
            </CustomForm>
          </>
        );
      })}
      <S.MenuAddButton onClick={() => chagneIsVisible()}>메뉴 추가</S.MenuAddButton>
      <S.NewMenuWrap $isVisible={isVisible}>
        <AddMenuForm />
      </S.NewMenuWrap>
    </S.Wrap>
  );
}
