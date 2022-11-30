import CustomTable from 'components/common/CustomTable';
import { useGetRoomListQuery } from 'store/api/room';
import * as S from './RoomList.style';
import RoomModal from './RoomModal';

function RoomList() {
  const { data: roomRes } = useGetRoomListQuery(1);

  return (
    <S.Container>
      <S.Heading>Room</S.Heading>
      <RoomModal />
      {roomRes && (
        <CustomTable
          data={roomRes.roomList}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
