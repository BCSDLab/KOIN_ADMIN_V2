import { message } from 'antd';
import { RoomResponse } from 'model/room.model';
import { useNavigate } from 'react-router-dom';
import {
  useAddRoomMutation, useDeleteRoomMutation, useUndeleteRoomMutation, useUpdateRoomMutation,
} from 'store/api/room';

export default function useRoomMutation(id: number) {
  const [updateRoomMutation] = useUpdateRoomMutation();
  const [deleteRoomMutation] = useDeleteRoomMutation();
  const [addRoomMutation] = useAddRoomMutation();
  const [undeleteRoomMutation] = useUndeleteRoomMutation();
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

  function addRoom(formData: Partial<RoomResponse>, {
    onSuccess,
    onError,
  }: { onSuccess?: () => void, onError?: (message: string) => void } = {}) {
    return addRoomMutation({ ...formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch(({ data }) => {
        onError?.(data.message);
      });
  }

  function undeleteRoom() {
    undeleteRoomMutation(id)
      .unwrap()
      .then(() => {
        message.success('복구되었습니다.');
        navigate(-1);
      }).catch((({ data }) => {
        message.error(data.message);
      }));
  }

  return {
    updateRoom, deleteRoom, addRoom, undeleteRoom,
  } as const;
}
