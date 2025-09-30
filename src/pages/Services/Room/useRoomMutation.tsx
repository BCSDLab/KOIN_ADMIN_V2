import { message } from 'antd';
import type { RoomResponse } from 'model/room.model';
import { useNavigate } from 'react-router-dom';
import {
  addRoom, updateRoom, deleteRoom, undeleteRoom,
} from 'api/room';
import roomQueries from 'queryFactory/roomQueries';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useRoomMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addRoomMutation = useMutation({
    mutationFn: (body: Partial<RoomResponse>) => addRoom(body),
    onSuccess: () => {
      message.success('방이 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: roomQueries.allKeys() });
    },
    onError: (error: any) => {
      message.error(error?.message ?? '방 추가 실패');
    },
  });

  const updateRoomMutation = useMutation({
    mutationFn: (payload: Pick<RoomResponse, 'id'> & Partial<RoomResponse>) => updateRoom(payload),
    onSuccess: () => {
      message.success('정보 수정이 완료되었습니다.');
      queryClient.invalidateQueries({ queryKey: roomQueries.allKeys() });
      navigate(-1);
    },
    onError: (error: any) => {
      message.error(error?.message ?? '수정 실패');
    },
  });

  const deleteRoomMutation = useMutation({
    mutationFn: (id:number) => deleteRoom(id),
    onSuccess: () => {
      message.success('삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: roomQueries.allKeys() });
      navigate(-1);
    },
    onError: (error: any) => {
      message.error(error?.message ?? '삭제 실패');
    },
  });

  const undeleteRoomMutation = useMutation({
    mutationFn: (id:number) => undeleteRoom(id),
    onSuccess: () => {
      message.success('복구되었습니다.');
      queryClient.invalidateQueries({ queryKey: roomQueries.allKeys() });
      navigate(-1);
    },
    onError: (error: any) => {
      message.error(error?.message ?? '복구 실패');
    },
  });

  return {
    addRoomMutation,
    updateRoomMutation,
    deleteRoomMutation,
    undeleteRoomMutation,
  } as const;
}
