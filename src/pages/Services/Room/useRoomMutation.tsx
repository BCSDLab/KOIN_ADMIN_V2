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
    deleteRoomMutation(id)
      .unwrap()
      .then(() => {
        message.success('삭제되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function updateRoom(formData: Partial<RoomResponse>) {
    updateRoomMutation({ id, ...formData })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function addRoom(formData: Partial<RoomResponse>) {
    return new Promise((resolve, reject) => {
      addRoomMutation({ ...formData })
        .unwrap()
        .then(() => {
          message.success('정보 추가가 완료되었습니다.');
          resolve('성공');
        })
        .catch(({ data }) => {
          message.error(data.message);
          reject();
        });
    });
  }

  return { updateRoom, deleteRoom, addRoom } as const;
}
