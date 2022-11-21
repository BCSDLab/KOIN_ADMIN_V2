import CustomTable from 'components/common/CustomTable';
// import { useState } from 'react';
import { useGetRoomListQuery } from 'store/api/room';
import * as S from './RoomList.style';

function RoomList() {
  const { data: roomRes } = useGetRoomListQuery(1);

  return (
    <S.Container>
      <S.Heading>Room</S.Heading>
      {roomRes && (
        <CustomTable
          data={roomRes.roomList}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
