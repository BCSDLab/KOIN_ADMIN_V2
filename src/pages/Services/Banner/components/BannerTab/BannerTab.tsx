import { BannerCategory } from 'model/bannerCategory.model';
import { useMemo } from 'react';
import * as S from './BannerTab.style';

interface BannerTabsProps {
  categories: BannerCategory[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function BannerTabs({ categories, selectedId, onSelect }: BannerTabsProps) {
  const orderedCategories = useMemo(() => {
    const selected = categories.find((category) => category.id === selectedId);
    const rest = categories.filter((category) => category.id !== selectedId);
    return selected ? [selected, ...rest] : categories;
  }, [categories, selectedId]);

  return (
    <S.CategoryTabContainer>
      {orderedCategories.length > 0 && (
        <>
          <S.TabButton
            type="button"
            $active
            onClick={() => onSelect(orderedCategories[0].id)}
          >
            {orderedCategories[0].name}
          </S.TabButton>

          <S.TabScrollWrapper>
            <S.TabList>
              {orderedCategories.slice(1).map((category) => (
                <li key={category.id}>
                  <S.TabButton
                    type="button"
                    $active={false}
                    onClick={() => onSelect(category.id)}
                  >
                    {category.name}
                  </S.TabButton>
                </li>
              ))}
            </S.TabList>
          </S.TabScrollWrapper>
        </>
      )}
    </S.CategoryTabContainer>
  );
}
