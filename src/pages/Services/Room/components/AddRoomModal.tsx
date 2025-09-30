/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import type { RoomResponse } from 'model/room.model';
import * as S from 'styles/List.style';
import DetailForm from './DetailForm';
import useRoomMutation from '../useRoomMutation';

export default function AddRoomModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addRoomMutation } = useRoomMutation();

  const createRoom = (values: Partial<RoomResponse>) => {
    addRoomMutation.mutate(values, {
      onSuccess: () => {
        onCancel();
        form.resetFields();
      },
    });
  };

  return (
    <CustomForm
      onFinish={createRoom}
      form={form}
    >
      <S.DetailFormWrap>
        <DetailForm form={form} />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
