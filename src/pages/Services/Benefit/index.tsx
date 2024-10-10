import * as Common from 'styles/List.style';
import CustomForm from 'components/common/CustomForm';
import { useState } from 'react';
import { Button, message } from 'antd';
import { useDeleteBenefitShopsMutation, useGetBenefitShopsQuery } from 'store/api/benefit';
import * as S from './index.style';
import Category from './components/Category';
import AdditionalModal from './components/AdditionalModal';
import CreationModal from './components/CreationModal';
import DeleteBenefitCategoryModal from './components/DeleteBenefitCategoryModal';
import ModifyModal from './components/ModifyModal';

export default function BenefitPage() {
  const [selected, setSelected] = useState<number>();
  const { data } = useGetBenefitShopsQuery(selected, {
    skip: !selected,
  });
  const [deleteShopsMutation] = useDeleteBenefitShopsMutation();
  const [isAdditionOpen, setIsAdditionOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpne, setIsDeleteOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<number[]>([]);
  const onShopClick = (id: number) => {
    setSelectedShop((prev) => {
      const isSelected = prev.find((item) => item === id);
      if (isSelected) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };
  const onClickBenefit = (id: number) => {
    setSelected((prev) => {
      if (prev === id) return undefined;
      return id;
    });
    setSelectedShop([]);
  };
  const deleteShops = () => {
    if (selected && selectedShop.length > 0) deleteShopsMutation({ id: selected, shop_ids: selectedShop }).then(() => message.success('상점을 삭제했습니다.'));
  };
  const onShopClickAll = () => {
    if (data) {
      const allId = data.shops.map((shop) => shop.id);
      setSelectedShop([...allId]);
    }
  };
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
  const openModifyModal = () => {
    setIsModifyOpen(true);
  };
  const closeModifyModal = () => {
    setIsModifyOpen(false);
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
              buttonText="수정"
              title="혜택 카테고리 수정하기"
              width={900}
              footer={null}
              open={isModifyOpen}
              onCancel={closeModifyModal}
              onClick={openModifyModal}
              destroyOnClose
              isDelete
              key={selected}
            >
              <ModifyModal
                closeModifyModal={closeModifyModal}
                selected={selected}
              />
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="생성"
              title="혜택 카테고리 등록하기"
              width={900}
              footer
              open={isCreateOpen}
              onCancel={closeCreateModal}
              onClick={openCreateModal}
            >
              <CreationModal closeCreateModal={closeCreateModal} />
            </CustomForm.Modal>
          </S.ButtonContainer>
        </S.SideContainer>
        <Category selected={selected} setSelected={setSelected} onClickBenefit={onClickBenefit} />
        <S.SideContainer>
          <Common.SmallHeading>
            혜택 상점 목록
          </Common.SmallHeading>
          <S.ButtonContainer>
            <Button onClick={onShopClickAll}>
              전체 선택
            </Button>
            <Button onClick={deleteShops}>
              삭제
            </Button>
            <CustomForm.Modal
              buttonText="추가"
              title="혜택 상점 목록 추가"
              width={750}
              footer
              open={isAdditionOpen}
              onCancel={closeAdditionModal}
              onClick={openAddtionModal}
            >
              <AdditionalModal id={selected} closeAdditionModal={closeAdditionModal} />
            </CustomForm.Modal>
          </S.ButtonContainer>
        </S.SideContainer>
        <S.ShopListContainer>
          {selected ? (
            <S.ShopContainer>
              {data?.shops.map((shop) => (
                <S.Button
                  isclicked={selectedShop.includes(shop.id)}
                  onClick={() => onShopClick(shop.id)}
                  key={shop.id}
                >
                  {shop.name}
                </S.Button>
              ))}
            </S.ShopContainer>
          ) : null}
        </S.ShopListContainer>
      </S.Container>
    </S.Wrapper>
  );
}
