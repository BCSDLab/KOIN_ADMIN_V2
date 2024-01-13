import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import { useGetStoreQuery } from 'store/api/store';
import { useGetMenusListQuery } from 'store/api/storeMenu';
import useMergeObjects from 'utils/hooks/useMergeObjects';
import useStoreMutation from './useStoreMutation';
import * as S from './StoreDetail.style';
import StoreDetailForm from './components/StoreDetailForm';

export default function StoreDetail() {
  const { id } = useParams();
  const { data: storeData } = useGetStoreQuery(Number(id));
  const { data: storeMenusData } = useGetMenusListQuery(Number(id));
  const { updateStore, deleteStore, undeleteStore } = useStoreMutation(Number(id));
  const [form] = CustomForm.useForm();
  const mergedData = useMergeObjects(storeData, storeMenusData);

  return (
    <S.Container>
      {storeData && storeMenusData && (
      <>
        <DetailHeading>Store Detail</DetailHeading>
        <S.BreadCrumb>
          {`Store Management / Store Detail / ${storeData?.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            // 여기서 updateStore, updateMenu 둘다 수행해야함
            onFinish={() => updateStore(form.getFieldsValue(true))}
            form={form}
            initialValues={mergedData}
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            <Divider orientation="left">기본 정보</Divider>
            <StoreDetailForm form={form} />
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
