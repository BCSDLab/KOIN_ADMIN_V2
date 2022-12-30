import React from 'react';
import { useParams } from 'react-router-dom';
// import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import { useGetRoomQuery } from 'store/api/room';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import DetailHeading from 'components/common/DetailHeading';
import useRoomMutation from './useRoomMutation';
import DetailForm from './DetailForm';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  const { id } = useParams();
  const { data: roomRes } = useGetRoomQuery(Number(id));
  const { updateRoom } = useRoomMutation(Number(id));
  // const defaultValueArr = getDefaultValueArr(roomRes);
  const { deleteRoom } = useRoomMutation(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Container>
      <DetailHeading>Room Detail</DetailHeading>
      <S.SubHeading>Home / Room / RoomDetail</S.SubHeading>
      <S.FormWrap>
        {roomRes
          && (
          <CustomForm
            onFinish={updateRoom}
            form={form}
            initialValues={roomRes}
          >
            <Divider orientation="left">기본 정보</Divider>
            <DetailForm roomRes={roomRes} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteRoom}>
                삭제
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
          )}
      </S.FormWrap>
    </S.Container>
  );
}
