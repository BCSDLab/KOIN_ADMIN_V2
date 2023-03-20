import CustomTable from 'components/common/CustomTable';
import { useState } from 'react';
import { useGetRoomListQuery } from 'store/api/room';
import CustomForm from 'components/common/CustomForm';
import useBooleanState from 'utils/hooks/useBoolean';
import { Switch } from 'antd';
import * as S from './RoomList.style';
import AddRoomModal from './components/AddRoomModal';

function RoomList() {
  const [page, setPage] = useState(1);
  const { setTrue: openModal, value: isModalOpen, setFalse: closeModal } = useBooleanState();
  const { value: isDeleted, changeValue: handleDeleted } = useBooleanState(false);
  const { data: roomRes } = useGetRoomListQuery({
    page,
    is_deleted: isDeleted,
  });

  return (
    <S.Container>
      <S.Heading>복덕방 목록</S.Heading>
      <S.ModalWrap>
        <CustomForm.Modal
          buttonText="생성"
          title="등록하기"
          width={900}
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          <AddRoomModal onCancel={closeModal} />
        </CustomForm.Modal>
      </S.ModalWrap>
      <S.SwitchWrapper>
        <Switch
          onClick={handleDeleted}
          checked={isDeleted}
          checkedChildren="trash"
          unCheckedChildren="trash"
        />
      </S.SwitchWrapper>
      {roomRes && (
        <CustomTable
          data={roomRes.roomList}
          pagination={{
            current: page,
            onChange: setPage,
            total: roomRes.totalPage,
          }}
          columnSize={[10, 20, 15, 35, 10]}
        />
      )}
    </S.Container>
  );
}

export default RoomList;
