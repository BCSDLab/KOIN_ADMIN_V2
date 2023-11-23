import { FormInstance } from 'antd/es/form/Form';
import { WholeMenuData } from 'model/menus.model';
import CustomProForm from 'components/common/CustomProForm';
import * as S from './CustomProForm.style';

export default function CustomProList({ form }: { form: FormInstance }) {
  const menus: WholeMenuData[] = form.getFieldValue('menu_categories');
  console.log(menus[0]);
  return (
    <CustomProForm.Wrap
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
          creatorButtonProps={{ creatorButtonText: '메뉴추가', style: { width: 'sm' } }}
          min={1}
          initialValue={menus[0].menus}
          creatorRecord={{ name: '', singlePrice: '', optionPrices: [{ option: '', price: '' }] }}
          deleteIconProps={{ tooltipText: '메뉴 삭제' }}
          copyIconProps={false}
            // eslint-disable-next-line react/no-unstable-nested-components
          itemRender={({ listDom, action }) => (
            <S.FoodItemsWrap>
              {listDom}
              <S.ResetFoodListButtonWrap>
                {action}
              </S.ResetFoodListButtonWrap>
            </S.FoodItemsWrap>
          )}
        >
          <S.ProFormTextWrap>
            <CustomProForm.Text placeholder="메뉴 이름" width="md" name="name" />
            <CustomProForm.Text placeholder="단일 메뉴 가격" width="xs" name="single_price" />
            <S.CardsWrap>
              <S.TextsWrap>
                <CustomProForm.List
                  name="option_prices"
                  creatorButtonProps={{ creatorButtonText: '사이즈 추가', style: { width: 'xs' } }}
                  min={1}
                  deleteIconProps={{ tooltipText: '사이즈 삭제' }}
                  copyIconProps={false}
                    // eslint-disable-next-line react/no-unstable-nested-components
                  itemRender={({ listDom, action }) => (
                    <S.FoodSizeItemsWrap>
                      {listDom}
                      <S.ResetFoodSizeButtonWrap>
                        {action}
                      </S.ResetFoodSizeButtonWrap>
                    </S.FoodSizeItemsWrap>
                  )}
                >
                  <CustomProForm.TextWrap>
                    <CustomProForm.Text placeholder="옵션" width="xs" name={['option']} />
                    <CustomProForm.Text placeholder="가격" width="md" name={['price']} />
                  </CustomProForm.TextWrap>
                </CustomProForm.List>
              </S.TextsWrap>
            </S.CardsWrap>
          </S.ProFormTextWrap>
        </CustomProForm.List>
      </S.ProFormListWrap>
    </CustomProForm.Wrap>
  );
}