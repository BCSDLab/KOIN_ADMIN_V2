import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import type { ModifyShopParams } from 'model/shop.model';
import { useQuery } from '@tanstack/react-query';
import shopQueries from 'queryFactory/shopQueries';
import useShopMutation from './components/useShopMutation';
import * as S from './ShopDetail.style';
import ShopDetailForm from './components/ShopDetailForm';
import MenuList from './components/MenuList';

export default function ShopDetail() {
  const { id } = useParams();
  const shopId = Number(id);
  const { data: shopData } = useQuery(shopQueries.detail(Number(id)));
  const {
    updateShopMutation,
    deleteShopMutation,
    undeleteShopMutation,
  } = useShopMutation();
  const [shopForm] = CustomForm.useForm<Partial<ModifyShopParams>>();

  const onFinish = (values : Partial<ModifyShopParams>) => {
    const updatedValues = { ...values };
    // open만 업데이트 되지않아 재할당함
    updatedValues.open = shopForm.getFieldValue('open');
    // TODO: 상점 메뉴 수정 로직 추가
    updateShopMutation.mutate({ id: Number(id), ...updatedValues });
  };

  return (
    <S.Container>
      {shopData && (
      <>
        <DetailHeading>Shop Detail</DetailHeading>
        <S.BreadCrumb>
          {`Store Management / Store Detail / ${shopData?.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            onFinish={onFinish}
            form={shopForm}
            initialValues={shopData}
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            <Divider orientation="left">기본 정보</Divider>
            <ShopDetailForm form={shopForm} />

            <Divider orientation="left" style={{ marginTop: '40px', marginBottom: '40px' }}>메뉴</Divider>
            <MenuList />
            <S.ButtonWrap>
              {shopData?.is_deleted
                ? (
                  <CustomForm.Button
                    danger
                    icon={<ReloadOutlined />}
                    onClick={() => undeleteShopMutation.mutate(shopId)}
                  >
                    복구
                  </CustomForm.Button>
                )
                : (
                  <CustomForm.Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => deleteShopMutation.mutate(shopId)}
                  >
                    삭제
                  </CustomForm.Button>
                )}
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
        </S.FormWrap>
      </>
      )}
    </S.Container>
  );
}
