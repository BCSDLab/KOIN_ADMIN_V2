import { RoomResponse } from 'model/room.model';
import { useUpdateRoomMutation } from 'store/api/room';

export default function useRoomMutation(id: number) {
  const [updatePost] = useUpdateRoomMutation();

  function updateForm(values: Record<number, RoomResponse>) {
    return updatePost({ id, ...values });
  }

  return { updateForm } as const;
}
