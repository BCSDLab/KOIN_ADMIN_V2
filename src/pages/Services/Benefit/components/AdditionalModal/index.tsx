import {
  Input, Divider, InputRef, Button, List, message,
} from 'antd';
import { useRef, useState } from 'react';
import { useAddBenefitShopsMutation, useSearchShopsQuery } from 'store/api/benefit';
import { Shops } from 'model/benefit.model';
import { MinusCircleOutlined } from '@ant-design/icons';
import * as S from './index.style';

interface Props {
  id: number | undefined;
  closeAdditionModal: () => void;
}

const { Search } = Input;
export default function AdditionalModal({ id, closeAdditionModal }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [shops, setShops] = useState<Shops[]>([]);
  const searchRef = useRef<InputRef>(null);
  const userInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const { data } = useSearchShopsQuery({ id, keyword }, {
    skip: !id || !keyword,
  });
  const [addShopMutation, {
    isError,
    isLoading,
  }] = useAddBenefitShopsMutation();
  const focusOn = () => setIsFocus(true);
  const focusOff = () => setIsFocus(false);
  const addShop = (shopId: number, name: string) => {
    if (shops.find((shop) => shop.id === shopId)) return;
    setShops((prev) => [...prev, { id: shopId, name }]);
    setKeyword('');
  };
  const cancelAddShop = (shopId: number) => {
    const filteredShop = shops.filter((shop) => shop.id !== shopId);
    setShops(filteredShop);
  };
  const ConfirmAddShop = async () => {
    if (shops.length === 0) {
      closeAdditionModal();
      return;
    }
    if (id) {
      const requestBody = shops.map((shop) => shop.id);
      await addShopMutation({ id, shop_ids: requestBody })
        .then(() => {
          message.success('상점을 추가했습니다.');
          setShops([]);
          setKeyword('');
          closeAdditionModal();
        });
    }
  };

  if (isError) message.error('상점을 추가할 수 없습니다.');

  return (
    <div>
      <S.SearchWrapper>
        <Search
          onChange={userInput}
          placeholder="상점 이름을 입력하세요"
          onFocus={focusOn}
          onBlur={focusOff}
          ref={searchRef}
          value={keyword}
        />
        {keyword.length !== 0 && isFocus && (
          <S.FlexColumn>
            {data?.non_benefit_shops.length === 0 ? <List />
              : (
                <div>
                  {data?.non_benefit_shops.map((shop) => (
                    <S.SearchItem onMouseDown={() => addShop(shop.id, shop.name)}>
                      {shop.name}
                    </S.SearchItem>
                  ))}
                </div>
              )}
          </S.FlexColumn>

        )}
      </S.SearchWrapper>

      <Divider orientation="left">선택 상점</Divider>
      <S.SelectContainer>
        {shops.map((shop) => (
          <S.ButtonWrapper>
            <Button style={{ width: '180px' }}>
              <S.DeleteButtonWrapper onClick={() => cancelAddShop(shop.id)}>
                <MinusCircleOutlined />
              </S.DeleteButtonWrapper>
              <S.ButtonContent>
                {shop.name}
              </S.ButtonContent>
            </Button>
          </S.ButtonWrapper>
        ))}
      </S.SelectContainer>
      <Button
        onClick={ConfirmAddShop}
        disabled={isLoading}
      >
        완료
      </Button>
    </div>
  );
}
