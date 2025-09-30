/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/rules-of-hooks */
import CustomForm from 'components/common/CustomForm';
import { Card, Divider } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import shopMenuQueries from 'queryFactory/shopMenuQueries';
import { useQuery } from '@tanstack/react-query';
import * as S from './MenuList.style';
import MenuDetailForm from './MenuDetail';
import useMenuMutation from './useMenuMutation';
import AddMenuForm from './AddMenuForm';

export default function MenuList() {
  const { id: shopId } = useParams();
  const { data: storeMenusData } = useQuery({
    ...shopMenuQueries.list(Number(shopId)),
  });
  const [menuId, setMenuId] = useState<number>();
  const menuListCategories = storeMenusData?.menu_categories ?? [];
  const { deleteMenuMutation, updateMenuMutation, isDeleting } = useMenuMutation(Number(shopId));

  const [menuForm] = CustomForm.useForm();

  const handleClick = (selectedMenuId: number) => {
    if (menuId && selectedMenuId) {
      updateMenuMutation.mutate({ menuId, body: menuForm?.getFieldsValue() });
    }
    if (selectedMenuId === menuId) {
      setMenuId(undefined);
      return;
    }
    setMenuId(selectedMenuId);
  };

  return (
    <S.Wrap>
      {menuListCategories.map((menuList) => {
        return (
          <>
            <Divider>{menuList.name}</Divider>
            <CustomForm
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              autoComplete="off"
              fields={getDefaultValueArr(menuList)}
            >
              <CustomForm.List name="menus">
                {(menus) => (
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
                            if (!isDeleting) {
                              await deleteMenuMutation.mutateAsync(menuList?.menus[field.name].id);
                            }
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
      <AddMenuForm />
    </S.Wrap>
  );
}
