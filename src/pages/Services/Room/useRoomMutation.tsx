import { message } from 'antd';
import { RoomResponse } from 'model/room.model';
import { useNavigate } from 'react-router-dom';
import { useDeleteRoomMutation, useUpdateRoomMutation } from 'store/api/room';

export default function useRoomMutation(id: number) {
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const navigate = useNavigate();

  function deleteRoomData() {
    deleteRoom(id);
    message.error('삭제되었습니다.');
  }

  function updateRoomDetail(values: Partial<RoomResponse>) {
    updateRoom({ id, ...values });
    message.success('정보 수정이 완료되었습니다.');
    navigate(-1);
  }

  return { updateRoomDetail, deleteRoomData } as const;
}
