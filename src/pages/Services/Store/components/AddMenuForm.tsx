import { UploadOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import CustomForm from 'components/common/CustomForm';
import React from 'react';
import { useParams } from 'react-router-dom';
import MenuDetailForm from './MenuDetailForm';
import useMenuMutation from './useMenuMutation';

export default function AddMenuForm() {
  const { id } = useParams();
  const [form] = CustomForm.useForm();
  const { addMenu } = useMenuMutation(Number(id));
  const handleClick = () => {
    const values = form.getFieldsValue();
    addMenu(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        form.resetFields();
      },
      onError: (errorMessage) => {
        message.error(errorMessage);
      },
    });
  };
  return (
    <CustomForm
      form={form}
    >
      <Card size="small">
        <MenuDetailForm form={form} />
        <CustomForm.Button
          icon={<UploadOutlined />}
          onClick={handleClick}
        >
          메뉴 생성
        </CustomForm.Button>
      </Card>
    </CustomForm>
  );
}
