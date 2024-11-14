/* eslint-disable no-restricted-imports */
import { Divider, FormInstance } from 'antd';
import { useState } from 'react';
import { useGetCategoryListQuery } from 'store/api/category';
import { ShopCategoriesModel } from 'model/store.model';
import { Category } from 'model/category.model';
import * as S from '../StoreDetail.style';

export default function StoreCategory({ form } : { form: FormInstance }) {
  const { data: categoryList } = useGetCategoryListQuery();
  // formData를 직접적으로 수정하면, 렌더링이 발생하지 않아 state를 따로 만들어서 관리
  const [selectedCategory, setSelectedCategory] = useState<ShopCategoriesModel[]>(form.getFieldValue('shop_categories') ?? []);

  const changeCategory = (category: Category) => {
    const categories = form.getFieldValue('shop_categories') as ShopCategoriesModel[];
    const selected = categories?.some(({ id }) => id === category.id);

    const newList = selected
      ? selectedCategory.filter(({ id }) => category.id !== id)
      : [...selectedCategory, category];

    form.setFieldsValue({
      shop_categories: newList,
      category_ids: newList.map(({ id }) => id),
    });
    setSelectedCategory(newList);
  };

  return (
    <div>
      <Divider orientation="left">카테고리</Divider>

      {categoryList && (
        <S.CategoryWrap>
          {categoryList.map((category) => (
            <S.CategoryItem
              selected={selectedCategory?.some(({ id }) => id === category.id)}
              key={category.id}
              onClick={() => changeCategory(category)}
            >
              <S.CategoryImg src={category.image_url} />
              <span>{category.name}</span>
            </S.CategoryItem>
          ))}
        </S.CategoryWrap>
      )}
    </div>
  );
}
