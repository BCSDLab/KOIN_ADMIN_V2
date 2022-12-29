import { message } from 'antd';
import { RoomResponse } from 'model/room.model';
import { useNavigate } from 'react-router-dom';
import { useDeleteRoomMutation, useUpdateRoomMutation } from 'store/api/room';

export default function useRoomMutation(id: number) {
  const [updateRoomRequest] = useUpdateRoomMutation();
  const [deleteRoomRequest] = useDeleteRoomMutation();
  const navigate = useNavigate();

  function deleteRoom() {
    deleteRoomRequest(id);
    message.error('삭제되었습니다.');
    navigate(-1);
  }

  function updateRoom(values: Partial<RoomResponse>) {
    updateRoomRequest({ id, ...values });
    message.success('정보 수정이 완료되었습니다.');
    navigate(-1);
  }

  return { updateRoom, deleteRoom } as const;
}
