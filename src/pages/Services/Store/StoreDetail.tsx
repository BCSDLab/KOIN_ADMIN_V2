import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import { useGetStoreQuery } from 'store/api/store';
import useStoreMutation from './useStoreMutation';
import * as S from './StoreDetail.style';
import StoreDetailForm from './components/StoreDetailForm';
import MenuList from './components/MenuList';

export default function StoreDetail() {
  const { id } = useParams();
  const { data: storeData } = useGetStoreQuery(Number(id));
  const { updateStore, deleteStore, undeleteStore } = useStoreMutation(Number(id));
  const [storeForm] = CustomForm.useForm();
  const [menuForm] = CustomForm.useForm();

  const onFinish = (values: any) => {
    const updatedValues = { ...values };

    // open만 업데이트 되지않아 재할당함
    updatedValues.open = storeForm.getFieldValue('open');

    // TODO: 상점 메뉴 수정 로직 추가
    // console.log('store data', updatedValues);
    // console.log('menu data', menuForm.getFieldsValue());

    console.log(updatedValues);

    updateStore(updatedValues);
  };

  return (
    <S.Container>
      {storeData && (
      <>
        <DetailHeading>Store Detail</DetailHeading>
        <S.BreadCrumb>
          {`Store Management / Store Detail / ${storeData?.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            onFinish={onFinish}
            form={storeForm}
            initialValues={storeData}
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            <Divider orientation="left">기본 정보</Divider>
            <StoreDetailForm form={storeForm} />

            <Divider orientation="left" style={{ marginTop: '40px', marginBottom: '40px' }}>메뉴</Divider>
            <MenuList form={menuForm} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              {storeData?.is_deleted
                ? (
                  <CustomForm.Button danger icon={<ReloadOutlined />} onClick={undeleteStore}>
                    복구
                  </CustomForm.Button>
                )
                : (
                  <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteStore}>
                    삭제
                  </CustomForm.Button>
                )}
            </S.ButtonWrap>
          </CustomForm>
        </S.FormWrap>
      </>
      )}
    </S.Container>
  );
}
