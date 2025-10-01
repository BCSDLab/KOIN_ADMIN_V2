import React from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import CustomForm from 'components/common/CustomForm';
import { useQuery } from '@tanstack/react-query';
import { ownerQueries } from 'queryFactory/ownerQueries';
import DetailForm from './components/DetailForm';

import * as S from './OwnerDetail.style';
import useOwnerMutation from './useOwnerMutation';

export default function OwnerDetail() {
  const { id } = useParams();
  const { data: ownerData } = useQuery(ownerQueries.owner(Number(id)));
  const [form] = CustomForm.useForm();
  const { updateOwnerMutation } = useOwnerMutation(Number(id));

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
              onFinish={updateOwnerMutation.mutate}
              form={form}
              initialValues={ownerData}
            >
              <Divider orientation="left">기본 정보</Divider>
              <DetailForm form={form} />
              <S.ButtonWrap>
                {/* <CustomForm.Button icon={<UploadOutlined />} htmlType="submit" disabled>
                  수정
                </CustomForm.Button>
                <CustomForm.Button danger icon={<DeleteOutlined />} disabled>
                  삭제
                </CustomForm.Button> */}
              </S.ButtonWrap>
            </CustomForm>
          </S.FormWrap>
        </>
      )}
    </S.Wrap>

  );
}
