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
  const [mainCategoryId, setMainCategoryId] = useState<number>(form.getFieldValue('main_category_id'));

  const changeCategory = (category: Category) => {
    const categories = form.getFieldValue('shop_categories') as ShopCategoriesModel[];
    const selected = categories?.some(({ id }) => id === category.id);

    const newList = selected
      ? selectedCategory.filter(({ id }) => category.id !== id)
      : [...selectedCategory, category];

    if (categories.map((item) => item.id).includes(mainCategoryId)
      && !newList.map((item) => item.id).includes(mainCategoryId)) return;

    form.setFieldsValue({
      shop_categories: newList,
      category_ids: newList.map(({ id }) => id),
    });
    setSelectedCategory(newList);
  };

  const selectMainCategory = (id: number) => {
    const selectedIds = selectedCategory.map((item) => item.id);
    if (selectedIds.includes(id)) {
      setMainCategoryId(id);
      form.setFieldValue('main_category_id', id);
    }
  };

  return (
    <div>
      <Divider orientation="left">카테고리</Divider>
      {categoryList && (
        <S.CategoryWrap>
          {categoryList.map((category) => (
            <S.CategoryButtonWrap>
              <S.CategoryItem
                selected={selectedCategory?.some(({ id }) => id === category.id)}
                key={category.id}
                onClick={() => changeCategory(category)}
              >
                <S.CategoryImg src={category.image_url} />
                <span>{category.name}</span>
              </S.CategoryItem>
              <input
                type="checkbox"
                checked={mainCategoryId === category.id}
                onChange={() => selectMainCategory(category.id)}
              />
            </S.CategoryButtonWrap>
          ))}
        </S.CategoryWrap>
      )}
    </div>
  );
}
