import { BannerCategory } from 'model/bannerCategory.model';
import { useEffect, useState } from 'react';
import * as S from './BannerTab.style';

interface BannerTabsProps {
  categories: BannerCategory[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function BannerTabs({ categories, selectedId, onSelect }: BannerTabsProps) {
  const [orderedCategories, setOrderedCategories] = useState<BannerCategory[]>(categories);

  useEffect(() => {
    if (selectedId) {
      const newOrder = categories.filter((category) => category.id !== selectedId);
      const selected = categories.find((category) => category.id === selectedId);
      if (selected) {
        setOrderedCategories([selected, ...newOrder]);
      }
    }
  }, [selectedId, categories]);

  return (
    <div>
      <S.CategoryTabContainer>
        <S.TabButton
          type="button"
          $active
          onClick={() => onSelect(selectedId)}
        >
          {orderedCategories.find((category) => category.id === selectedId)?.name}
        </S.TabButton>

        <S.TabScrollWrapper>
          <S.TabList>
            {orderedCategories
              .filter((category) => category.id !== selectedId)
              .map((category) => (
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
      </S.CategoryTabContainer>
    </div>
  );
}
