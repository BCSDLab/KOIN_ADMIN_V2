import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOwnerRequestQuery } from 'store/api/ownerRequest';
import { Divider } from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';
import DetailHeading from 'components/common/DetailHeading';
import CustomForm from 'components/common/CustomForm';
import useOwnerMutation from './useOwnerRequestMutation';
import DetailForm from './components/DetailForm';

import * as S from './OwnerRequestDetail.style';

export default function OwnerRequestDetail() {
  const { id } = useParams();
  const { data: ownerData } = useGetOwnerRequestQuery(Number(id));
  const { updateOwnerRequest } = useOwnerMutation(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Wrap>
      {ownerData && (
        <>
          <DetailHeading>Owner Detail</DetailHeading>
          <S.BreadCrumb>
            {`Owner Management / Owner Detail / ${ownerData.name}`}
          </S.BreadCrumb>
          <S.FormWrap>
            <CustomForm
              onFinish={updateOwnerRequest}
              form={form}
              initialValues={ownerData}
            >
              <Divider orientation="left">기본 정보</Divider>
              <DetailForm form={form} />
              <S.ButtonWrap>
                <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                  승인
                </CustomForm.Button>
                {/* <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteOwner}>
                  삭제
                </CustomForm.Button> */}
                {/* 삭제는 soft delete 문제와 조금 더 다루 부분이 있어 주석 처리 후 재작업하겠습니다. */}
              </S.ButtonWrap>
            </CustomForm>
          </S.FormWrap>
        </>
      )}
    </S.Wrap>

  );
}
