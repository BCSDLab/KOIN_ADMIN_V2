import React from 'react';
import { useParams } from 'react-router-dom';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import { useGetRoomQuery } from 'store/api/room';
import * as S from './RoomDetail.style';
import DetailForm from './DetailForm';
import useRoomMutation from './useRoomMutation';
import CustomForm from 'components/common/CustomForm';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { RoomResponse } from 'model/room.model';
import { Divider } from 'antd';



export default function RoomDetail() {
  const { id } = useParams();
  const { data: roomRes } = useGetRoomQuery(Number(id));
  const { updateRoomDetail } = useRoomMutation(Number(id));
  const defaultValueArr = getDefaultValueArr(roomRes);
  const { deleteRoomData } = useRoomMutation(Number(id));
  const [form] = CustomForm.useForm();


  return (
    <S.Container>
      <S.Heading>Room Detail</S.Heading>
      <S.SubHeading>Home / Room / RoomDetail</S.SubHeading>
      <S.FormWrap>
        <CustomForm
          onFinish={updateRoomDetail}
          form={form}
          fields={defaultValueArr}
        />
        <Divider orientation="left">기본 정보</Divider>
        <DetailForm />
        <S.ButtonWrap>
        <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
          완료
        </CustomForm.Button>
        <CustomForm.Button danger icon={<DeleteOutlined />} onClick={deleteRoomData}>
          삭제
        </CustomForm.Button>
      </S.ButtonWrap>
    </CustomForm>
      </S.FormWrap>
    </S.Container>
  );
}
