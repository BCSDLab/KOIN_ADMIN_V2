import {
  ProFormText,
  ProForm,
  ProFormList,
} from '@ant-design/pro-components';
import * as S from './CustomForm.style';

interface OptionPrice {
  option: string;
  price: number;
}

interface MenuData {
  name: string;
  singlePrice?: number;
  optionPrices?: OptionPrice[];
}

interface CustomProListProps {
  menus: MenuData[];
}

export default function CustomProList({ menus }: CustomProListProps) {
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
        {menus.length !== 0 && (
        <ProFormList
          name="menus"
          creatorButtonProps={{
            creatorButtonText: '메뉴추가',
            style: { width: 'sm' },
          }}
          min={1}
          initialValue={menus}
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
            <ProFormText
              placeholder="menuName"
              width="md"
              name="name"
            />
            <ProFormText
              placeholder="singlePrice"
              width="xs"
              name="singlePrice"
            />
            <S.CardsWrap>
              <S.TextsWrap>
                <ProFormList
                  name="optionPrices"
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
                  <S.TextWrap>
                    <ProFormText
                      name={['option']}
                      width="xs"
                      placeholder="option"
                    />
                    <ProFormText
                      name={['price']}
                      width="md"
                      placeholder="price"
                    />
                  </S.TextWrap>
                </ProFormList>
              </S.TextsWrap>
            </S.CardsWrap>
          </S.ProFormTextWrap>
        </ProFormList>
        )}
      </S.ProFormListWrap>
    </ProForm>
  );
}
