import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import { RoomResponse } from 'model/room.model';
import DetailForm from './DetailForm';
import * as S from './RoomList.style';
import useRoomMutation from './useRoomMutation';

export default function AddRoomModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addRoom } = useRoomMutation(1);

  const createRoom = (values: Partial<RoomResponse>) => {
    addRoom(values);
    onCancel();
    form.resetFields();
  };

  return (
    <CustomForm
      onFinish={createRoom}
      form={form}
    >
      <S.DetailFormWrap>
        <DetailForm />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
