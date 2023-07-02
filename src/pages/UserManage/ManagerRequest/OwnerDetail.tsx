import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOwnerQuery, useGetUserOwnerQuery } from 'store/api/owner';
import { Divider } from 'antd';
import {
  UploadOutlined, DeleteOutlined,
} from '@ant-design/icons';
import DetailHeading from 'components/common/DetailHeading';
import CustomForm from 'components/common/CustomForm';
import useOwnerMutation from './useOwnerMutation';
import DetailForm from './components/DetailForm';

import * as S from './OwnerDetail.style';

export default function OwnerDetail() {
  const { id } = useParams();
  const { data: ownerData } = useGetOwnerQuery(Number(id));
  const { data: ownerUserData } = useGetUserOwnerQuery(Number(id));
  const { updateOwner, deleteOwner } = useOwnerMutation(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Container>
      {ownerData && ownerUserData && (
        <>
          <DetailHeading>Owner Detail</DetailHeading>
          <S.BreadCrumb>
            {`Owner Management / Owner Detail / ${ownerData.name}`}
          </S.BreadCrumb>
          <S.FormWrap>
            <CustomForm
              onFinish={updateOwner}
              form={form}
              initialValues={ownerData}
            >
              <Divider orientation="left">기본 정보</Divider>
              <DetailForm />
              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  승인
                </CustomForm.Button>
                <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteOwner}>
                  삭제
                </CustomForm.Button>
              </S.ButtonWrap>
            </CustomForm>
          </S.FormWrap>
        </>
      )}
    </S.Container>

  );
}
