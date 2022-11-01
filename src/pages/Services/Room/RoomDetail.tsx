import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery } from 'store/api/Room';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  const { id }: any = useParams();
  const { data: roomRes } = useGetRoomQuery(id);
  console.log(roomRes);

  return (
    <S.Container>
      <S.Heading>RoomDetail</S.Heading>
      <div />
    </S.Container>
  );
}
