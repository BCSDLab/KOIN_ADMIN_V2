import React from 'react';
import { useParams } from 'react-router-dom';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import { useGetStoreQuery } from 'store/api/store';
import useStoreMutation from './useStoreMutation';
import DetailForm from './components/DetailForm';
import * as S from './StoreDetail.style';

export default function StoreDetail() {
  const { id } = useParams();
  const { data: storeData } = useGetStoreQuery(Number(id));
  const { updateStore, deleteStore, undeleteStore } = useStoreMutation(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Container>
      {storeData && (
      <>
        <DetailHeading>Store Detail</DetailHeading>
        <S.BreadCrumb>
          {`Store Management / Store Detail / ${storeData.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            onFinish={updateStore}
            form={form}
            initialValues={storeData}
          >
            <Divider orientation="left">기본 정보</Divider>
            <DetailForm form={form} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              {storeData.is_deleted
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
