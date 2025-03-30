import { PlusOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBannerListQuery } from 'store/api/banner';
import { useGetBannerCategoryListQuery } from 'store/api/bannerCategory';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomTable from 'components/common/CustomTable';
import BannerTabs from './components/BannerTab/BannerTab';
import useBannerColumns from './components/CustomColumn/CustomColumn';
import CategoryDescriptionBox from './components/Description/Description';
import useBannerMutation from './useBannerMutation';
import * as S from './BannerList.style';

export default function BannerList() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { value: isActive, changeValue: handleActive } = useBooleanState(false);
  const { data: BannerCategory } = useGetBannerCategoryListQuery();
  const { updateBannerPriority, toggleBannerActive } = useBannerMutation();
  const customColumns = useBannerColumns({ toggleBannerActive, updateBannerPriority });

  const categories = useMemo(() => {
    return BannerCategory?.banner_categories ?? [];
  }, [BannerCategory]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  const selectedCategoryName = useMemo(() => {
    return categories.find((category) => category.id === selectedCategory)?.name;
  }, [categories, selectedCategory]);

  const { data: BannerRes } = useGetBannerListQuery(
    {
      page,
      banner_category_name: selectedCategoryName ?? '',
      is_active: isActive ? true : undefined,
    },
    {
      skip: !selectedCategoryName,
    },
  );

  return (
    <S.Container>
      <BannerTabs
        categories={categories}
        selectedId={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <S.CategoryControlWrapper>
        <CategoryDescriptionBox
          selectedCategoryId={selectedCategory}
          categories={categories}
        />
        <Switch
          onClick={handleActive}
          checked={isActive}
          checkedChildren="활성화"
          unCheckedChildren="비활성화"
        />
      </S.CategoryControlWrapper>

      {BannerRes && (
      <CustomTable
        data={BannerRes!.banners}
        pagination={{
          current: page,
          onChange: setPage,
          total: BannerRes!.total_page,
        }}
        columnSize={[5, 15, 15, 20, 10, 10, 10]}
        hiddenColumns={isActive ? [] : ['priority']}
        customColumns={customColumns}
      />
      )}
      <S.ButtonWrapper>
        <Button
          icon={<PlusOutlined />}
          onClick={() => navigate('/banner/write')}
        >
          배너 추가
        </Button>
      </S.ButtonWrapper>

    </S.Container>
  );
}
