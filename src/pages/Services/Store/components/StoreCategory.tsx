/* eslint-disable no-restricted-imports */
// import CustomForm from 'components/common/CustomForm';
import { Divider, FormInstance } from 'antd';
import { useState } from 'react';
import { useGetCategoryListQuery } from 'store/api/category';
import { ShopCategoriesModel } from 'model/store.model';
import * as S from '../StoreDetail.style';

export default function StoreCategory({ form } : { form: FormInstance }) {
  const [page] = useState(1);
  const { data: categoryList } = useGetCategoryListQuery(page);
  const selectedCategory: ShopCategoriesModel[] = form.getFieldValue('shop_categories');

  return (
    <div>
      <Divider orientation="left">카테고리</Divider>

      {categoryList && (
        <S.CategoryWrap>
          {categoryList.categories.map((category) => (
            <S.CategoryItem
              selected={selectedCategory?.some(({ id }) => id === category.id)}
              key={category.id}
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
