import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetRoomListQuery } from 'store/api/Room';
import * as S from './Room.style';

function RoomList() {
  const [page, setPage] = useState(1);
  const { data: roomRes } = useGetRoomListQuery(page);

  return (
    <S.Container>
      <S.Heading>Room</S.Heading>
      {roomRes && (
        <CustomTable
          tableData={roomRes.roomList}
          currentPage={page}
          handlePageChange={setPage}
          totalPage={roomRes.totalPage}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
