import { MenuCategory } from 'model/menus.model';
import CustomProForm from 'components/common/CustomProForm';
import CustomForm from 'components/common/CustomForm';
import useBooleanState from 'utils/hooks/useBoolean';
import { FormInstance } from 'antd/es/form/Form';
import { useState } from 'react';
import * as S from './StoreMenus.style';
import EditAddMenuModal from './EditMenuModal';

export default function StoreMenus({ form }: { form: FormInstance }) {
  const { setTrue: openModal, value: isModalOpen, setFalse: closeModal } = useBooleanState();
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const menus: MenuCategory[] = form.getFieldValue('menu_categories');

  const onClick = (index: number) => {
    setSelectedMenuId(index);
    openModal();
  };

  return (
    <CustomProForm
      layout="horizontal"
      submitter={{
        searchConfig: { resetText: '저장', submitText: '초기화' },
        resetButtonProps: { size: 'middle', style: { backgroundColor: '#1677ff', borderColor: '#1677ff', color: 'white' } },
        submitButtonProps: { size: 'middle', style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' } },
      }}
    >
      <S.ProFormListWrap>
        <CustomProForm.List
          name="menus"
          creatorButtonProps={false}
          min={1}
          initialValue={menus[0].menus}
          creatorRecord={{ useMode: 'none' }}
          deleteIconProps={false}
          copyIconProps={false}
          // eslint-disable-next-line react/no-unstable-nested-components
          itemRender={({ listDom, action }, index) => (
            <S.MenuItemsWrap>
              {listDom}
              <S.ResetMenuListButtonWrap>
                {action}
                <CustomForm.Modal
                  buttonText="메뉴 상세보기"
                  title="메뉴 상세보기"
                  width={900}
                  footer={null}
                  open={isModalOpen}
                  onCancel={closeModal}
                  onClick={() => onClick(index.record.id)}
                >
                  {selectedMenuId !== null && <EditAddMenuModal menuId={selectedMenuId} />}
                </CustomForm.Modal>
              </S.ResetMenuListButtonWrap>
            </S.MenuItemsWrap>
          )}
        >
          <S.ProFormTextWrap>
            <CustomProForm.Text placeholder="메뉴 이름" width="md" name="name" disabled />
            <CustomProForm.Text placeholder="단일 메뉴 가격" width="sm" name="single_price" disabled />
          </S.ProFormTextWrap>
        </CustomProForm.List>
      </S.ProFormListWrap>
    </CustomProForm>
  );
}
