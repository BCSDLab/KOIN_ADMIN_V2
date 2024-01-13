import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import { useGetStoreQuery } from 'store/api/store';
import { useGetMenusListQuery } from 'store/api/storeMenu';
import useMergeObjects from 'utils/hooks/useMergeObjects';
import useStoreMutation from './useStoreMutation';
import DetailForm from './components/DetailForm';
import * as S from './StoreDetail.style';

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
            // 해당 폼은 dayjs 라이브러리를 사용하여 변환된 데이터가 폼에 포함되어 있기 때문에,
            // <FormItem>을 통해 값을 직접 변경하지 않고, get/setFieldValue로 읽고 수정한다.
            // form.getFieldsValue(true)는, <FormItem>에 포함된 값뿐만 아닌, form.setFieldValue로 설정된 값도 포함한다.
            // 기본 onFinish callback의 인자는 <FormItem>에 포함된 값만을 가지고 있다.
            onFinish={() => updateStore(form.getFieldsValue(true))}
            form={form}
            initialValues={mergedData}
            style={{ fontFamily: 'Noto Sans KR' }}
          >
            <Divider orientation="left">기본 정보</Divider>
            <DetailForm form={form} />
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
