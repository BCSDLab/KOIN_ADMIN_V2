import {
  Input, Divider, InputRef, Button, List, message,
} from 'antd';
import { useRef, useState } from 'react';
import { Shops } from 'model/benefit.model';
import { MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import benefitQueries from 'queryFactory/benefitQueries';
import { addBenefitShops } from 'api/benefit';
import * as S from './index.style';
// eslint-disable-next-line
import * as Style from '../../index.style';

interface Props {
  id: number | undefined;
  closeAdditionModal: () => void;
}

interface ShopDetail {
  shop_id: number;
  detail: string;
}

const { Search } = Input;
export default function AdditionalModal({ id, closeAdditionModal }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);
  const [shops, setShops] = useState<Shops[]>([]);
  const [details, setDetails] = useState<ShopDetail[]>([]);
  const searchRef = useRef<InputRef>(null);
  const userInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const { data } = useQuery(benefitQueries.searchShops(id, keyword));
  const { mutate: addShopMutation, isError, isPending } = useMutation({
    mutationFn: addBenefitShops,
    onSuccess: () => {
      message.success('상점을 추가했습니다.');
      setShops([]);
      setDetails([]);
      setKeyword('');
      closeAdditionModal();
    },
  });
  const focusOn = () => setIsFocus(true);
  const focusOff = () => setIsFocus(false);
  const addShop = (shopId: number, name: string) => {
    if (shops.find((shop) => shop.id === shopId)) return;
    setShops((prev) => [...prev, { id: shopId, name }]);
    setDetails((prev) => [...prev, { shop_id: shopId, detail: '' }]);
    setKeyword('');
  };
  const cancelAddShop = (shopId: number) => {
    const filteredShop = shops.filter((shop) => shop.id !== shopId);
    const filteredDetail = details.filter((shop) => shop.shop_id !== shopId);
    setShops(filteredShop);
    setDetails(filteredDetail);
  };

  const ConfirmAddShop = async () => {
    if (shops.length === 0) {
      closeAdditionModal();
      return;
    }
    if (id) {
      if (details.some((shop) => shop.detail === '')) {
        message.error('상세정보를 입력해주세요.');
        return;
      }
      addShopMutation({ id, shop_details: details });
    }
  };

  const handleDetail = (e: React.ChangeEvent<HTMLInputElement>, shopId: number) => {
    const { value } = e.target;
    const shopDetail = details.find((shop) => shop.shop_id === shopId);
    if (shopDetail) {
      const filteredDetail = details.filter((shop) => shop.shop_id !== shopId);
      setDetails([...filteredDetail, { shop_id: shopId, detail: value }]);
    } else {
      setDetails((prev) => [...prev, { shop_id: shopId, detail: value }]);
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
                    <S.SearchItem onMouseDown={() => addShop(shop.id, shop.name)} key={shop.name}>
                      {shop.name}
                    </S.SearchItem>
                  ))}
                </div>
              )}
          </S.FlexColumn>

        )}
      </S.SearchWrapper>

      <Divider orientation="left">선택 상점</Divider>
      <Style.ShopList>
        <thead>
          <Style.HeaderRow>
            <Style.HeaderItem>상점명</Style.HeaderItem>
            <Style.HeaderItem>상세정보</Style.HeaderItem>
          </Style.HeaderRow>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <Style.Row key={shop.id} isclicked={false}>
              <Style.TitleItem>
                <S.ButtonWrapper key={shop.id}>
                  <S.DeleteButtonWrapper onClick={() => cancelAddShop(shop.id)}>
                    <MinusCircleOutlined />
                  </S.DeleteButtonWrapper>
                  {shop.name}
                </S.ButtonWrapper>
              </Style.TitleItem>
              <Style.DetailItem>
                <S.DetailInput onChange={(e) => handleDetail(e, shop.id)} />
              </Style.DetailItem>
            </Style.Row>
          ))}
        </tbody>
      </Style.ShopList>
      <S.FlexRight>
        <Button
          onClick={ConfirmAddShop}
          disabled={isPending}
        >
          <UploadOutlined />
          완료
        </Button>
      </S.FlexRight>
    </div>
  );
}
