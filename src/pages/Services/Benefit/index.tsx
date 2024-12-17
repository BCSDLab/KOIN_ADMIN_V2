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
import BenefitDetailModifyModal from './components/BenefitDetailModifyModal';

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
  const [isBenefitDetailOpen, setIsBenefitDetailOpen] = useState(false);
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

  const handleModal = (setOpenModal: React.Dispatch<React.SetStateAction<boolean>>, type: string, state: 'open' | 'close') => {
    if (type === 'delete' && state === 'open') {
      if (selected) setOpenModal(true);
      return;
    }

    if (state === 'open') {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
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
              onCancel={() => handleModal(setIsDeleteOpen, 'delete', 'close')}
              onClick={() => handleModal(setIsDeleteOpen, 'delete', 'open')}
              isDelete
            >
              <DeleteBenefitCategoryModal
                id={selected}
                closeModal={() => handleModal(setIsDeleteOpen, 'delete', 'close')}
              />
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="수정"
              title="혜택 카테고리 수정하기"
              width={900}
              footer={null}
              open={isModifyOpen}
              onCancel={() => handleModal(setIsModifyOpen, 'modify', 'close')}
              onClick={() => handleModal(setIsModifyOpen, 'modify', 'open')}
              destroyOnClose
              isDelete
              key={selected}
            >
              <ModifyModal
                closeModifyModal={() => handleModal(setIsModifyOpen, 'modify', 'close')}
                selected={selected}
              />
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="생성"
              title="혜택 카테고리 등록하기"
              width={900}
              footer
              open={isCreateOpen}
              onCancel={() => handleModal(setIsCreateOpen, 'create', 'close')}
              onClick={() => handleModal(setIsCreateOpen, 'create', 'open')}
            >
              <CreationModal closeCreateModal={() => handleModal(setIsCreateOpen, 'create', 'close')} />
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
              buttonText="수정"
              title="혜택 상점 미리보기 수정"
              width={750}
              footer
              open={isBenefitDetailOpen}
              onCancel={() => handleModal(setIsBenefitDetailOpen, 'benefitDetail', 'close')}
              onClick={() => {
                if (selectedShop.length === 0) return;
                handleModal(setIsBenefitDetailOpen, 'benefitDetail', 'open');
              }}
            >
              <BenefitDetailModifyModal
                shops={data?.shops.filter((shop) => selectedShop.includes(shop.id))}
                closeBenefitModifyModal={() => handleModal(setIsBenefitDetailOpen, 'benefitDetail', 'close')}
              />
            </CustomForm.Modal>
            <CustomForm.Modal
              buttonText="추가"
              title="혜택 상점 목록 추가"
              width={750}
              footer
              open={isAdditionOpen}
              onCancel={() => handleModal(setIsAdditionOpen, 'addition', 'close')}
              onClick={() => handleModal(setIsAdditionOpen, 'addition', 'open')}
            >
              <AdditionalModal id={selected} closeAdditionModal={() => handleModal(setIsAdditionOpen, 'addition', 'close')} />
            </CustomForm.Modal>
          </S.ButtonContainer>
        </S.SideContainer>
        {selected ? (
          <S.ShopList>
            <thead>
              <S.HeaderRow>
                <S.HeaderItem>상점명</S.HeaderItem>
                <S.HeaderItem>상세정보</S.HeaderItem>
              </S.HeaderRow>
            </thead>
            <tbody>
              {data?.shops.map((shop) => (
                <S.Row
                  isclicked={selectedShop.includes(shop.id)}
                  onClick={() => onShopClick(shop.id)}
                  key={shop.id}
                >
                  <S.TitleItem>
                    {shop.name}
                  </S.TitleItem>
                  <S.DetailItem>
                    {shop.detail}
                  </S.DetailItem>
                </S.Row>
              ))}
            </tbody>
          </S.ShopList>

        ) : null}
      </S.Container>
    </S.Wrapper>
  );
}
