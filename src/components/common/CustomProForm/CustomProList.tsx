import {
  ProForm,
  ProFormList,
} from '@ant-design/pro-components';
import { FormInstance } from 'antd/es/form/Form';
import { WholeMenuData } from 'model/menus.model';
import CustomProForm from 'components/common/CustomProForm';
import * as S from './CustomProForm.style';

export default function CustomProList({ form }: { form: FormInstance }) {
  const menus: WholeMenuData [] = form.getFieldValue('menu_categories');
  return (
    <ProForm
      style={{
        flexDirection: 'column',
      }}
      layout="horizontal"
      submitter={{
        searchConfig: {
          resetText: '저장',
          submitText: '초기화',
        },
        resetButtonProps: {
          size: 'middle',
          style: {
            backgroundColor: '#1677ff', borderColor: '#1677ff', color: 'white',
          },
        },
        submitButtonProps: {
          size: 'middle',
          style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' },
        },
      }}
    >
      <S.ProFormListWrap>
        <ProFormList
          name="menus"
          creatorButtonProps={{
            creatorButtonText: '메뉴추가',
            style: { width: 'sm' },
          }}
          min={1}
          initialValue={menus[0].menus}
          creatorRecord={{ name: '', singlePrice: '', optionPrices: [{ option: '', price: '' }] }}
          deleteIconProps={{ tooltipText: '삭제' }}
          copyIconProps={false}
            // eslint-disable-next-line react/no-unstable-nested-components
          itemRender={({ listDom, action }) => (
            <div style={{ display: 'flex', width: '100%' }}>
              <div style={{ flex: 1 }}>{listDom}</div>
              <div style={{
                display: 'flex',
                borderRadius: '5px',
                margin: '0 auto auto 15px',
                width: '30px',
                height: '40px',
              }}
              >
                {action}
              </div>
            </div>
          )}
        >
          <S.ProFormTextWrap>
            <CustomProForm.Text placeholder="메뉴 이름" width="md" name="name" />
            <CustomProForm.Text placeholder="단일 메뉴 가격" width="xs" name="single_price" />
            <CustomProForm.CardsWrap>
              <ProFormList
                name="option_prices"
                creatorButtonProps={{
                  creatorButtonText: '사이즈 추가',
                  style: { width: 'xs' },
                }}
                min={1}
                deleteIconProps={{ tooltipText: '삭제' }}
                copyIconProps={false}
                    // eslint-disable-next-line react/no-unstable-nested-components
                itemRender={({ listDom, action }) => (
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <div>{listDom}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>{action}</div>
                  </div>
                )}
              >
                <CustomProForm.TextWrap>
                  <CustomProForm.Text placeholder="옵션" width="xs" name={['option']} />
                  <CustomProForm.Text placeholder="가격" width="md" name={['price']} />
                </CustomProForm.TextWrap>
              </ProFormList>
            </CustomProForm.CardsWrap>
          </S.ProFormTextWrap>
        </ProFormList>
      </S.ProFormListWrap>
    </ProForm>
  );
}
