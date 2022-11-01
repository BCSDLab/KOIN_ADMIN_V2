import { Form, Input } from 'antd';
import CustomForm from 'components/common/CustomForm';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery } from 'store/api/Room';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  const { id }: any = useParams();
  const { data: roomRes } = useGetRoomQuery(id);
  console.log(roomRes);

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };

  return (
    <S.Container>
      <S.Heading>RoomDetail</S.Heading>
      {roomRes && (
        <CustomForm onFinish={onFinish}>
          <CustomForm.GridRow grid="2fr 1fr 1fr 1fr">
            <CustomForm.Input label="방이름" defaultValue={roomRes?.name} />
            <CustomForm.Input
              label="방종류"
              defaultValue={roomRes?.room_type}
            />
            <CustomForm.Input
              label="관리비"
              defaultValue={roomRes?.management_fee}
            />
            <CustomForm.Input label="방크기" defaultValue={roomRes?.size} />
          </CustomForm.GridRow>
          <CustomForm.GridRow grid="3fr 1fr 1fr 1fr">
            <CustomForm.Input
              label="월세"
              defaultValue={roomRes?.monthly_fee}
            />
            <CustomForm.Input
              label="전세"
              defaultValue={roomRes?.charter_fee}
            />
            <CustomForm.Input label="위도" defaultValue={roomRes?.latitude} />
            <CustomForm.Input label="경도" defaultValue={roomRes?.longitude} />
          </CustomForm.GridRow>
          <CustomForm.GridRow grid="1fr 1fr 1fr 1fr">
            <CustomForm.Input label="보증금" defaultValue={roomRes?.deposit} />
            <CustomForm.Input label="층수" defaultValue={roomRes?.floor} />
            <CustomForm.Input label="전화번호" defaultValue={roomRes?.phone} />
            <CustomForm.Input label="주소" defaultValue={roomRes?.address} />
          </CustomForm.GridRow>
          <Form.Item name="설명" label="설명">
            <Input.TextArea
              defaultValue={roomRes.description}
              showCount
              maxLength={200}
            />
          </Form.Item>
          <CustomForm.Button />
        </CustomForm>
      )}
    </S.Container>
  );
}
