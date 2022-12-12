import CustomTable from 'components/common/CustomTable';
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
          columnSize={[10, 20, 15, 35, 10]}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
