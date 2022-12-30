import { UploadOutlined } from '@ant-design/icons';
import { message } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { RoomResponse } from 'model/room.model';
import { useAddRoomMutation } from 'store/api/room';
import DetailForm from './DetailForm';
import * as S from './RoomList.style';

export default function AddRoomModal({ onCancel }: { onCancel: () => void }) {
  const [addRoom] = useAddRoomMutation();
  const [form] = CustomForm.useForm();

  const createRoom = (values: Partial<RoomResponse>) => {
    addRoom(values);
    onCancel();
    message.success('정보 추가가 완료되었습니다.');
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
