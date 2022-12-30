import { UploadOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { RoomResponse } from 'model/room.model';
import { useAddRoomMutation } from 'store/api/room';
import useBooleanState from 'utils/hooks/useBoolean';
import DetailForm from './DetailForm';
import * as S from './RoomList.style';

export default function RoomModal() {
  const { isValue: isModalOpen, setFalse: closeModal } = useBooleanState();
  const [addRoom] = useAddRoomMutation();
  const [form] = CustomForm.useForm();

  const createRoom = (values: Partial<RoomResponse>) => {
    addRoom(values);
    closeModal();
  };

  return (
    <Modal
      title="등록하기"
      open={isModalOpen}
      onCancel={closeModal}
      centered
      width={900}
      footer={null}
    >
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
    </Modal>
  );
}
