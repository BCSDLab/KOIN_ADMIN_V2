import { useGetMenuListQuery } from 'store/api/storeMenu';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import {
  Button, Divider, Form, Input, Space,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// import * as S from './MenuList.style';

export default function MenuDetailForm({ menuId }:{ menuId: number }) {
  const [form] = CustomForm.useForm();
  const { id } = useParams();
  const { data: storeMenu } = useGetMenuListQuery({
    id: Number(id), menuId: Number(menuId),
  });

  console.log(storeMenu);

  return (
    <div>
      {storeMenu && (
        <CustomForm
          form={form}
          initialValues={storeMenu}
          name="storeMenuDetail"
        >
          <Form.Item label="메뉴 이름" name="name">
            <Input name="name" />
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
          <CustomForm.MultipleUpload domain="shops" name="image_urls" form={form} />

        </CustomForm>
      )}
    </div>
  );
}
