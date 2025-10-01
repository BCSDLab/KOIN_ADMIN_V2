import { Button } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import benefitQueries from 'queryFactory/benefitQueries';
import { deleteBenefitCategory } from 'api/benefit';
import * as S from './index.style';

interface Props {
  id: number | undefined;
  closeModal: () => void;
}
export default function DeleteBenefitCategoryModal({ id, closeModal }: Props) {
  const { mutate: deleteMutation } = useMutation({
    mutationFn: deleteBenefitCategory,
  });

  const { data } = useQuery(benefitQueries.getBenefitCategory());
  const deleteBenefitCategoryButton = () => {
    if (id) {
      deleteMutation({ id });
      closeModal();
    }
  };
  if (!data) return null;
  const findCurrentCategory = data.benefits.find((item) => item.id === id);
  const categoryName = findCurrentCategory ? findCurrentCategory.title : '';
  return (
    <>
      <S.NameWrapper>
        {`'${categoryName}'`}
      </S.NameWrapper>
      카테고리를 삭제하시겠습니까?
      <br />
      카테고리에 해당하는 상점 목록들도 함께 삭제 돼요.
      <S.ButtonContainer>
        <S.ButtonSet>
          <Button onClick={closeModal}>취소</Button>
          <Button onClick={deleteBenefitCategoryButton}>삭제</Button>
        </S.ButtonSet>
      </S.ButtonContainer>
    </>
  );
}
