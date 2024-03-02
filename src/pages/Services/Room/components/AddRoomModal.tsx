/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';
import { RoomResponse } from 'model/room.model';
import { message } from 'antd';
import * as S from 'styles/List.style';
import DetailForm from './DetailForm';
import useRoomMutation from '../useRoomMutation';

export default function AddRoomModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addRoom } = useRoomMutation(1);

  const createRoom = (values: Partial<RoomResponse>) => {
    addRoom(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        onCancel();
        form.resetFields();
      },
      onError: (errorMessage) => {
        message.error(errorMessage);
      },
    });
    // .then(() => {
    //   onCancel();
    //   form.resetFields();
    // })
    // .catch();
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
