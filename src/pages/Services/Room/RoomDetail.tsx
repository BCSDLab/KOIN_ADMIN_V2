import React from 'react';
import { useParams } from 'react-router-dom';
// import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import { useGetRoomQuery } from 'store/api/room';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, ReloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import useRoomMutation from './useRoomMutation';
import DetailForm from './components/DetailForm';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  const { id } = useParams();
  const { data: roomData } = useGetRoomQuery(Number(id));
  const { updateRoom, deleteRoom, undeleteRoom } = useRoomMutation(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Container>
      {roomData && (
      <>
        <DetailHeading>Room Detail</DetailHeading>
        <S.BreadCrumb>
          {`Room Management / Room Detail / ${roomData.name}`}
        </S.BreadCrumb>
        <S.FormWrap>
          <CustomForm
            onFinish={updateRoom}
            form={form}
            initialValues={roomData}
          >
            <Divider orientation="left">기본 정보</Divider>
            <DetailForm form={form} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              {roomData.is_deleted
                ? (
                  <CustomForm.Button danger icon={<ReloadOutlined />} onClick={undeleteRoom}>
                    삭제 복구
                  </CustomForm.Button>
                )
                : (
                  <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteRoom}>
                    삭제
                  </CustomForm.Button>
                )}
            </S.ButtonWrap>
          </CustomForm>
        </S.FormWrap>
      </>
      )}
    </S.Container>
  );
}
