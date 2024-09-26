import { useEffect } from 'react';
import { useGetBenefitCategoryQuery } from 'store/api/benefit';
import * as S from './index.style';

interface Props {
  selected: number | undefined;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
  onClickBenefit: (id: number) => void;
}

export default function Category({ selected, setSelected, onClickBenefit }: Props) {
  const { data } = useGetBenefitCategoryQuery();

  useEffect(() => {
    if (data) setSelected(data.benefits[0].id);
  }, [data, setSelected]);

  return (
    <S.Container>
      {data?.benefits && data.benefits.map((benefit) => (
        <S.Box onClick={() => onClickBenefit(benefit.id)} isClicked={selected === benefit.id}>
          <img src={selected === benefit.id ? benefit.on_image_url : benefit.off_image_url} alt="toggle-off" />
          {benefit.title}
        </S.Box>
      ))}
    </S.Container>
  );
}
