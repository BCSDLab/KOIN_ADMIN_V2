import { message } from 'antd';
import { RoomResponse } from 'model/room.model';
import { useNavigate } from 'react-router-dom';
import { useAddRoomMutation, useDeleteRoomMutation, useUpdateRoomMutation } from 'store/api/room';

export default function useRoomMutation(id: number) {
  const [updateRoomMutation] = useUpdateRoomMutation();
  const [deleteRoomMutation] = useDeleteRoomMutation();
  const [addRoomMutation] = useAddRoomMutation();
  const navigate = useNavigate();

  function deleteRoom() {
    deleteRoomMutation(id);
    message.success('삭제되었습니다.');
    navigate(-1);
  }

  function updateRoom(values: Partial<RoomResponse>) {
    updateRoomMutation({ id, ...values });
    message.success('정보 수정이 완료되었습니다.');
    navigate(-1);
  }

  function addRoom(values: Partial<RoomResponse>) {
    addRoomMutation({ ...values });
    message.success('정보 추가가 완료되었습니다.');
  }

  return { updateRoom, deleteRoom, addRoom } as const;
}
