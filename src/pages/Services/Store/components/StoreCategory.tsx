/* eslint-disable no-restricted-imports */
import { Checkbox, Divider, FormInstance } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import { useGetCategoryListQuery } from 'store/api/category';
import { ShopCategoriesModel } from 'model/store.model';
import { Category } from 'model/category.model';
import * as S from '../StoreDetail.style';

export default function StoreCategory({ form } : { form: FormInstance }) {
  const [page] = useState(1);
  const { data: categoryList } = useGetCategoryListQuery({ page, size: 100 });
  // formData를 직접적으로 수정하면, 렌더링이 발생하지 않아 state를 따로 만들어서 관리
  const [selectedCategory, setSelectedCategory] = useState<ShopCategoriesModel[]>(form.getFieldValue('shop_categories') ?? []);
  const [isMainCategory, setIsMainCategory] = useState(false);
  const [mainId, setMainId] = useState<number | null>(null);

  const changeCategory = (category: Category) => {
    const categories = form.getFieldValue('shop_categories') as ShopCategoriesModel[];
    const selected = categories?.some(({ id }) => id === category.id);
    const newList = selected
      ? selectedCategory.filter(({ id }) => category.id !== id)
      : [...selectedCategory, category];
    if (isMainCategory) {
      setMainId(category.id);
    }

    form.setFieldsValue({
      main_category_id: isMainCategory ? category.id : mainId,
      shop_categories: newList,
      category_ids: newList.map(({ id }) => id),
    });
    setSelectedCategory(newList);
  };
  const handleMainCategoryChange = (e: CheckboxChangeEvent) => {
    setIsMainCategory(e.target.checked);
  };
  return (
    <div>
      <Divider orientation="left">카테고리</Divider>
      <S.MainCategoryCheckBoxWrap>
        <Checkbox onChange={handleMainCategoryChange} />
        <span>메인 카테고리</span>
      </S.MainCategoryCheckBoxWrap>
      {categoryList && (
        <S.CategoryWrap>
          {categoryList.categories.map((category) => (
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
