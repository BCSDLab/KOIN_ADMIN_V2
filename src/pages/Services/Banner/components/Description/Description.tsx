import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useRef, useState, useEffect } from 'react';
import { Input, Button, InputRef } from 'antd';

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
  const [description, setDescription] = useState('');

  const { updateBannerDescription } = useBannerCategoryMutation();

  useEffect(() => {
    setDescription(selected?.description || '');
    setIsEditing(false);
  }, [selected?.description, selectedCategoryId]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    updateBannerDescription({
      id: selectedCategoryId,
      description,
    });

    setIsEditing(false);
  };

  return (
    <S.DescriptionBox>
      <S.FormWrap>
        <S.InputWrap>
          <Input
            ref={inputRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            style={{ width: '100%' }}
          />
        </S.InputWrap>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            icon={<EditOutlined />}
            type="default"
          >
            설명 수정하기
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            icon={<CheckOutlined />}
            type="primary"
          >
            설명 저장하기
          </Button>
        )}
      </S.FormWrap>
    </S.DescriptionBox>
  );
}
