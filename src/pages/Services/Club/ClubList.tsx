import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Select } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetClubCategoryListQuery, useGetClubListQuery } from 'store/api/club';
import CustomTable from 'components/common/CustomTable';
import useClubMutation from './useClubMutation';
import CustomColumns from './Components/CustomColumns/CustomColumns';
import * as S from './ClubList.style';

export default function ClubList() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number>();

  const { data: ClubCategory } = useGetClubCategoryListQuery();
  const { toggleClubActive } = useClubMutation();
  const { data: ClubRes } = useGetClubListQuery({
    page,
    club_category_id: selectedCategory,
  });

  const clubCategoryOptions: Record<string, string> = ClubCategory
    ? {
      0: '전체',
      ...ClubCategory.club_categories.reduce((categoryMap, clubCategory) => {
        categoryMap[clubCategory.id] = clubCategory.name;
        return categoryMap;
      }, {} as Record<string, string>),
    }
    : { 0: '전체' };

  const columns = CustomColumns({ toggleClubActive });

  return (
    <S.Container>
      <S.Heading>동아리 관리</S.Heading>
      <Flex justify="end">
        <Select
          defaultValue={clubCategoryOptions[0]}
          style={{ width: 120 }}
          options={Object.entries(clubCategoryOptions).map(([id, name]) => ({
            label: name,
            value: id,
          }))}
          onChange={(value) => setSelectedCategory(Number(value))}
        />
      </Flex>

      {ClubRes && (
        <CustomTable
          data={ClubRes.clubs}
          pagination={{
            current: page,
            onChange: setPage,
            total: ClubRes.total_page,
          }}
          columnSize={[5, 10, 10, 15, 10, 10, 10]}
          columns={columns}
        />
      )}

      <Flex justify="end">
        <Button icon={<PlusOutlined />} onClick={() => navigate('/club/write')}>
          신규 동아리 생성
        </Button>
      </Flex>
    </S.Container>
  );
}
