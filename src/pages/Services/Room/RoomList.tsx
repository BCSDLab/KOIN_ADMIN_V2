import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetRoomListQuery } from 'store/api/room';
import * as S from './RoomList.style';
import RoomModal from './RoomModal';

function RoomList() {
  const [page, setPage] = useState(1);
  const { data: roomRes } = useGetRoomListQuery(page);

  return (
    <S.Container>
      <S.Heading>Room</S.Heading>
      <RoomModal />
      {roomRes && (
        <CustomTable
          data={roomRes.roomList}
          pagination={{
            current: page,
            onChange: setPage,
            total: roomRes.totalPage,
          }}
          columnSize={[10, 20, 15, 35, 10]}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
