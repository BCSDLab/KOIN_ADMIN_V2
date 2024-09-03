import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import CustomForm from 'components/common/CustomForm';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useBooleanState from 'utils/hooks/useBoolean';
import MenuDetailForm from './MenuDetailForm';
import useMenuMutation from './useMenuMutation';
import * as S from './MenuList.style';

export default function AddMenuForm() {
  const { id } = useParams();
  const [form] = CustomForm.useForm();
  const { addMenu } = useMenuMutation(Number(id));
  const { value: isVisible, changeValue: chagneIsVisible } = useBooleanState();
  const handleClick = () => {
    const values = form.getFieldsValue();
    addMenu(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        form.resetFields();
        form.setFieldValue('image_urls', []);
      },
      onError: (error) => {
        if (error?.violations) message.error(error.violations[0]);
        else message.error(error.message);
      },
    });
  };
  useEffect(() => {
    form.setFieldValue('image_urls', []);
  }, [form]);
  return (
    <>
      <S.MenuAddButton onClick={() => chagneIsVisible()} type="dashed" icon={<PlusOutlined />}>메뉴 추가</S.MenuAddButton>
      <S.NewMenuWrap $isVisible={isVisible}>
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
      </S.NewMenuWrap>
    </>
  );
}
