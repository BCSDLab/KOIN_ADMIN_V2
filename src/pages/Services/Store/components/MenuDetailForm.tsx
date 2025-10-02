import { DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Checkbox, Divider, Form, Input, Space,
} from 'antd';
import { FormInstance } from 'antd/lib';
import CustomForm from 'components/common/CustomForm';
import { ShopMenuCategory } from 'model/shopMenuCategory';
import type { MenuResponse } from 'model/shopMenus.model';
import React from 'react';
import { useParams } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBoolean';
import shopMenuCategoryQueries from 'queryFactory/shopMenuCategoryQueries';

export default function MenuDetailForm({ form, shopMenu }: {
  form: FormInstance, shopMenu?: MenuResponse
}) {
  const { id: shopId } = useParams();
  const { data: ShopMenuCategories } = useQuery({
    ...shopMenuCategoryQueries.list(Number(shopId)),
  });

  const { required } = CustomForm.validateUtils();
  const {
    value: isSingleMenu,
    changeValue: isSingleMenuChange,
  } = useBooleanState(shopMenu?.is_single);
  const options = ShopMenuCategories?.menu_categories.map((category: ShopMenuCategory) => ({
    label: category.name,
    value: category.id,
  }));
  form.setFieldValue('is_single', isSingleMenu);

  const setSingleMenu = () => {
    isSingleMenuChange();
    form.setFieldValue('option_prices', null);
  };

  return (
    <CustomForm
      form={form}
      initialValues={shopMenu}
      name="shopMenuDetail"
    >
      <Form.Item label="카테고리" name="category_ids" rules={[required]}>
        <Checkbox.Group options={options} />
      </Form.Item>
      <Form.Item label="메뉴 이름" name="name" rules={[required]}>
        <Input name="name" />
      </Form.Item>
      <Form.Item name="is_single">
        <Checkbox
          checked={isSingleMenu}
          onChange={() => setSingleMenu()}
        >
          단일 메뉴
        </Checkbox>
      </Form.Item>
      <Form.Item label="단일 메뉴 가격" name="single_price">
        <Input name="single_price" disabled={!isSingleMenu} />
      </Form.Item>

      {/* 옵션 가격 수정 */}
      <Form.Item label="옵션 가격">
        <Form.List name="option_prices">
          {(fields, { add, remove }) => (
            <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
              {fields.map((field) => (
                <Space key={field.key}>
                  <Form.Item name={[field.name, 'option']} label="옵션">
                    <Input name="option" disabled={isSingleMenu} />
                  </Form.Item>
                  <Form.Item name={[field.name, 'price']} label="가격">
                    <Input name="price" disabled={isSingleMenu} />
                  </Form.Item>
                  <DeleteOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                </Space>
              ))}
              <Button type="dashed" onClick={() => add()} block disabled={isSingleMenu}>
                + 옵션 가격 추가
              </Button>
            </div>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="설명" name="description">
        <Input.TextArea name="description" />
      </Form.Item>

      <Divider orientation="left">사진</Divider>
      <CustomForm.MultipleUpload domain="market" name="image_urls" form={form} />
    </CustomForm>
  );
}
