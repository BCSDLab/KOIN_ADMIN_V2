import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import CustomForm from 'components/common/CustomForm';
import { InputRef } from 'antd';
import useBannerCategoryMutation from 'pages/Services/Banner/useBannerCategoryMutation';
import { BannerCategory } from 'model/bannerCategory.model';
import * as S from './Description.style';

interface CategoryDescriptionBoxProps {
  selectedCategoryId: number;
  categories: BannerCategory[];
}

export default function CategoryDescriptionBox({
  selectedCategoryId,
  categories,
}: CategoryDescriptionBoxProps) {
  const selected = categories.find((category) => category.id === selectedCategoryId);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const [form] = CustomForm.useForm();
  const { updateBannerDescription } = useBannerCategoryMutation();

  useEffect(() => {
    form.setFieldsValue({ description: selected?.description || '' });
    setIsEditing(false);
  }, [form, selected?.description, selectedCategoryId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    const values = form.getFieldsValue();
    const newDescription = values.description;

    updateBannerDescription({
      id: selectedCategoryId,
      description: newDescription,
    });

    setIsEditing(false);
  };

  return (
    <S.DescriptionBox>
      <CustomForm
        form={form}
        initialValues={{ description: selected?.description || '' }}
        style={{ width: '100%' }}
      >
        <S.FormWrap>
          <S.InputWrap>
            <CustomForm.Input
              ref={inputRef}
              label=""
              name="description"
              disabled={!isEditing}
              style={{ width: '100%' }}
            />
          </S.InputWrap>
          {!isEditing ? (
            <CustomForm.Button
              onClick={() => setIsEditing(true)}
              icon={<EditOutlined />}
              type="default"
            >
              설명 수정하기
            </CustomForm.Button>
          ) : (
            <CustomForm.Button
              onClick={handleSave}
              icon={<CheckOutlined />}
              type="primary"
            >
              설명 저장하기
            </CustomForm.Button>
          )}
        </S.FormWrap>
      </CustomForm>
    </S.DescriptionBox>
  );
}
