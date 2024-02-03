import { useGetMenuListQuery } from 'store/api/storeMenu';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import {
  Button, Checkbox, Divider, Form, Input, Space,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';
import { useLayoutEffect } from 'react';
import { useGetMenuCategoriesQuery } from 'store/api/storeMenu/category';
import { MenuCategory } from 'model/menuCategory';

export default function MenuDetailForm({ menuId, form }:{ menuId: number, form: FormInstance }) {
  const { id } = useParams();
  const { data: storeMenu } = useGetMenuListQuery({
    id: Number(id), menuId,
  });
  const { data: menuCategories } = useGetMenuCategoriesQuery(Number(id));

  useLayoutEffect(() => {
    form.setFieldsValue(storeMenu);
  });

  const options = menuCategories?.menu_categories.map((category: MenuCategory) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <div>
      {storeMenu && (
        <CustomForm
          form={form}
          initialValues={storeMenu}
          name="storeMenuDetail"
        >
          <Form.Item label="카테고리" name="category_ids">
            <Checkbox.Group
              options={options}
              defaultValue={storeMenu.category_ids}
            />
          </Form.Item>
          <Form.Item label="메뉴 이름" name="name">
            <Input name="name" />
          </Form.Item>
          <Form.Item name="is_single" valuePropName="checked">
            <Checkbox>단일 메뉴</Checkbox>
          </Form.Item>
          <Form.Item label="단일 메뉴 가격" name="single_price">
            <Input name="single_price" />
          </Form.Item>

          {/* 옵션 가격 수정 */}
          <Form.Item label="옵션 가격">
            <Form.List name="option_prices">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Form.Item name={[field.name, 'option']} label="옵션">
                        <Input name="option" />
                      </Form.Item>
                      <Form.Item name={[field.name, 'price']} label="가격">
                        <Input name="price" />
                      </Form.Item>
                      <DeleteOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>
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
      )}
    </div>
  );
}
