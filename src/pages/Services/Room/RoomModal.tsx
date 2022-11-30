import { PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { RoomResponse } from 'model/room.model';
import { useAddRoomMutation } from 'store/api/room';
import useBooleanState from 'utils/hooks/useBooleanState';
import DetailForm from './DetailForm';

export default function RoomModal() {
  const [isModalOpen, openModal, closeModal] = useBooleanState();
  const [addRoom] = useAddRoomMutation();

  const handleOk = (values: Partial<RoomResponse>) => {
    addRoom(values);
    closeModal();
  };

  return (
    <>
      <CustomForm.Button icon={<PlusOutlined />} onClick={openModal}>생성</CustomForm.Button>
      <Modal title="등록하기" open={isModalOpen} onCancel={closeModal} centered width={900}>
        <DetailForm onFinish={handleOk} />
      </Modal>
    </>
  );
}
