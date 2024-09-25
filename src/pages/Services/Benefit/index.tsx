import * as Common from 'styles/List.style';
import CustomForm from 'components/common/CustomForm';
import { Button } from 'antd';
import { useState } from 'react';
import { useGetBenefitShopsQuery } from 'store/api/benefit';
import * as S from './index.style';
import Category from './components/Category';
import AdditionalModal from './components/AdditionalModal';
import CreationModal from './components/CreationModal';
import DeleteBenefitCategoryModal from './components/DeleteBenefitCategoryModal';

export default function BenefitPage() {
  const [selected, setSelected] = useState<number>();
  const { data } = useGetBenefitShopsQuery(selected, {
    skip: !selected,
  });
  const [isAdditionOpen, setIsAdditionOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpne, setIsDeleteOpen] = useState(false);
  const openAddtionModal = () => {
    setIsAdditionOpen(true);
  };
  const closeAdditionModal = () => {
    setIsAdditionOpen(false);
  };
  const openCreateModal = () => {
    setIsCreateOpen(true);
  };
  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };
  const openDeleteModal = () => {
    if (selected) setIsDeleteOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
  };
  return (
    <S.Wrapper>
      <Common.Heading>
        혜택 카테고리/상점 목록
      </Common.Heading>
      <S.Container>
        <S.SideContainer>
          <Common.SmallHeading>
            혜택 카테고리
          </Common.SmallHeading>
          <S.ButtonContainer>
            <CustomForm.Modal
              buttonText="삭제"
              title="카테고리 삭제 확인"
              width={600}
              footer={null}
              open={isDeleteOpne}
              onCancel={closeDeleteModal}
              onClick={openDeleteModal}
              isDelete
            >
              <DeleteBenefitCategoryModal
                id={selected}
                closeModal={closeDeleteModal}
              />
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="생성"
              title="혜택 카테고리 등록하기"
              width={750}
              footer
              open={isCreateOpen}
              onCancel={closeCreateModal}
              onClick={openCreateModal}
            >
              <CreationModal />
            </CustomForm.Modal>
          </S.ButtonContainer>
        </S.SideContainer>
        <Category selected={selected} setSelected={setSelected} />
        <S.SideContainer>
          <Common.SmallHeading>
            혜택 상점 목록
          </Common.SmallHeading>
          <S.ButtonContainer>
            <Button>
              전체 선택
            </Button>
            <CustomForm.Modal
              buttonText="삭제"
              title="등록하기"
              width={900}
              footer={null}
              open={false}
              onCancel={() => { }}
              onClick={() => { }}
              isDelete
            >
              1
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="추가"
              title="혜택 상점 목록 추가"
              width={750}
              footer
              open={isAdditionOpen}
              onCancel={closeAdditionModal}
              onClick={openAddtionModal}
            >
              <AdditionalModal id={selected} />
            </CustomForm.Modal>
          </S.ButtonContainer>
        </S.SideContainer>
        {data?.shops.map((shop) => <Button>{shop.name}</Button>)}
      </S.Container>
    </S.Wrapper>
  );
}
