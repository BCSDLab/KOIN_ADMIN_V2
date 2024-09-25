import { useEffect } from 'react';
import { useGetBenefitCategoryQuery } from 'store/api/benefit';
import * as S from './index.style';

interface Props {
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>
}

export default function Category({ selected, setSelected }: Props) {
  const { data } = useGetBenefitCategoryQuery();

  const onClickBenefit = (id: number) => {
    setSelected((prev) => {
      if (prev === id) return undefined;
      return id;
    });
  };

  useEffect(() => {
    if (data) setSelected(data.benefits[0].id);
  }, [data, setSelected]);

  return (
    <S.Container>
      {data?.benefits && data.benefits.map((benefit) => (
        <S.Box onClick={() => onClickBenefit(benefit.id)} isClicked={selected === benefit.id}>
          <img src={benefit.off_image_url} alt="toggle-off" />
          {benefit.title}
        </S.Box>
      ))}
    </S.Container>
  );
}
