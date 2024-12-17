import {
  Divider, Button, message,
} from 'antd';
import { MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import * as S from 'pages/Services/Benefit/components/AdditionalModal/index.style';
import { ShopInfo } from 'model/benefit.model';
import { useEffect, useState } from 'react';
import { useModifyBenefitDetailsMutation } from 'store/api/benefit';
import * as Style from 'pages/Services/Benefit/index.style';

interface Props {
  closeBenefitModifyModal: () => void;
  shops?: ShopInfo[];
}

interface ModifyDetails {
  shop_id: number;
  detail: string;
  name: string;
  shop_benefit_map_id: number;
}

export default function BenefitDetailModifyModal({ closeBenefitModifyModal, shops }: Props) {
  const [details, setDetails] = useState<ModifyDetails[]>([]);
  const [mutation] = useModifyBenefitDetailsMutation();

  const handleDetail = (e: React.ChangeEvent<HTMLInputElement>, shopId: number) => {
    const { value } = e.target;
    const shopDetail = details.find((shop) => shop.shop_id === shopId);
    if (shopDetail) {
      const findItem = details.find((shop) => shop.shop_id === shopId);
      if (!findItem) return;
      const newDetail = {
        shop_id: findItem.shop_id,
        detail: value,
        name: findItem.name,
        shop_benefit_map_id: findItem.shop_benefit_map_id,
      };
      const filteredDetail = details.filter((shop) => shop.shop_id !== shopId);
      setDetails([...filteredDetail, newDetail]);
    } else {
      setDetails((prev) => [...prev, {
        shop_id: shopId,
        detail: value,
        name: shops?.find((shop) => shop.id === shopId)?.name || '',
        shop_benefit_map_id: shops?.find((shop) => shop.id === shopId)?.shop_benefit_map_id || 0,
      }]);
    }
  };

  const modifyDetails = () => {
    const shopDetails = details.map((shop) => ({
      shop_benefit_map_id: shop.shop_benefit_map_id,
      detail: shop.detail,
    }));
    mutation({ modify_details: shopDetails });
  };

  const confirmModifyDetails = () => {
    if (details.some((shop) => shop.detail.trim() === '')) {
      message.error('상세정보를 입력해주세요.');
      return;
    }
    modifyDetails();
    closeBenefitModifyModal();
  };

  useEffect(() => {
    if (shops) {
      const shopDetails = shops.map((shop) => ({
        shop_id: shop.id,
        detail: shop.detail,
        name: shop.name,
        shop_benefit_map_id: shop.shop_benefit_map_id,
      }));
      setDetails(shopDetails);
    }
  }, [shops]);

  if (!shops) return null;

  return (
    <div>
      <Divider orientation="left">선택 상점</Divider>
      <Style.ShopList>
        <thead>
          <Style.HeaderRow>
            <Style.HeaderItem>상점명</Style.HeaderItem>
            <Style.HeaderItem>상세정보</Style.HeaderItem>
          </Style.HeaderRow>
        </thead>
        <tbody>
          {details.map((shop) => (
            <Style.Row key={shop.shop_id} isclicked={false}>
              <Style.TitleItem>
                <S.ButtonWrapper key={shop.shop_id}>
                  <S.DeleteButtonWrapper>
                    <MinusCircleOutlined />
                  </S.DeleteButtonWrapper>
                  {shop.name}
                </S.ButtonWrapper>
              </Style.TitleItem>
              <Style.DetailItem>
                <S.DetailInput onChange={(e) => handleDetail(e, shop.shop_id)} />
              </Style.DetailItem>
            </Style.Row>
          ))}
        </tbody>
      </Style.ShopList>
      <S.FlexRight>
        <Button
          onClick={confirmModifyDetails}
        >
          <UploadOutlined />
          완료
        </Button>
      </S.FlexRight>
    </div>
  );
}
