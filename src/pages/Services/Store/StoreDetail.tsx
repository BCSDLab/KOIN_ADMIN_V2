import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import type { ModifyStoreParams } from 'model/store.model';
import { useQuery } from '@tanstack/react-query';
import shopQueries from 'queryFactory/shopQueries';
import useShopMutation from './components/useShopMutation';
import * as S from './StoreDetail.style';
import StoreDetailForm from './components/StoreDetailForm';
import MenuList from './components/MenuList';

export default function StoreDetail() {
  const { id } = useParams();
  const shopId = Number(id);
  const { data: shopData } = useQuery(shopQueries.detail(Number(id)));
  const {
    updateShopMutation,
    deleteShopMutation,
    undeleteShopMutation,
  } = useShopMutation();
  const [storeForm] = CustomForm.useForm<Partial<ModifyStoreParams>>();

  const onFinish = (values : Partial<ModifyStoreParams>) => {
    const updatedValues = { ...values };
    // open만 업데이트 되지않아 재할당함
    updatedValues.open = storeForm.getFieldValue('open');
    // TODO: 상점 메뉴 수정 로직 추가
    // updateStore(updatedValues);
    updateShopMutation.mutate({ id: Number(id), ...updatedValues });
  };

  return (
    <S.Container>
      {shopData && (
      <>
        <DetailHeading>Store Detail</DetailHeading>
        <S.BreadCrumb>
          {`Store Management / Store Detail / ${shopData?.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            onFinish={onFinish}
            form={storeForm}
            initialValues={shopData}
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            <Divider orientation="left">기본 정보</Divider>
            <StoreDetailForm form={storeForm} />

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
