import { Divider, Spin } from 'antd';
import React, { Suspense } from 'react';
import DetailForm from './DetailForm';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  return (
    <S.Container>
      <S.Heading>Room Detail</S.Heading>
      <S.SubHeading>Home / Room / RoomDetail</S.SubHeading>
      <Divider />
      <S.FormWrap>
        <Suspense fallback={<Spin />}>
          <DetailForm />
        </Suspense>
      </S.FormWrap>
    </S.Container>
  );
}
