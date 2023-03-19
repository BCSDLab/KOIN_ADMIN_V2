import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetCategoryListQuery } from 'store/api/category';
import * as S from 'styles/List.style';

function Category() {
  const [page, setPage] = useState(1);
  const { data: categoryData } = useGetCategoryListQuery(page);

  return (
    <S.Container>
      <S.Heading>카테고리 목록</S.Heading>
      {categoryData && (
        <CustomTable
          data={categoryData.categories}
          pagination={{
            current: page,
            onChange: setPage,
            total: categoryData.total_page,
          }}
          columnSize={[10, 20, 70]}
        />
      )}

    </S.Container>
  );
}

export default Category;
