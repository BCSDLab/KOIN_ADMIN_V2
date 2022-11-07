import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider, Form, Input } from 'antd';
import CustomForm from 'components/common/CustomForm';
import ROOM_OPTION from 'constant/roomOption';
import { RoomResponse } from 'model/room.model';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery, useUpdateRoomMutation } from 'store/api/Room';
import * as S from './RoomDetail.style';

export default function RoomDetail() {
  const { id }: any = useParams();
  const { data: roomRes } = useGetRoomQuery(id);
  const [updatePost] = useUpdateRoomMutation();
  const [form] = Form.useForm();

  const imageList = roomRes?.image_urls?.map((res: string, index: number) => ({
    uid: `${-(index + 1)}`,
    name: res,
    status: 'done',
    url: res,
  }));

  const deleteRoom = () => {
    // TODO: 삭제 기능 추가
  };

  const onFinish = (values: Record<number, RoomResponse>) => {
    updatePost({ id, ...values });
  };

  return (
    <S.Container>
      <S.Heading>Room Detail</S.Heading>
      <S.SubHeading>Home / Room / RoomDetail</S.SubHeading>
      <Divider />
      <S.FormWrap>
        {roomRes && (
          <CustomForm onFinish={onFinish} form={form}>
            <CustomForm.GridRow grid="1.5fr 1fr 1fr 1fr">
              <CustomForm.Input
                label="방이름"
                name="name"
                defaultValue={roomRes?.name}
              />
              <CustomForm.Input
                label="방종류"
                name="room_type"
                defaultValue={roomRes?.room_type}
              />
              <CustomForm.Input
                label="관리비"
                name="management_fee"
                defaultValue={roomRes?.management_fee}
              />
              <CustomForm.Input
                label="방크기"
                name="size"
                defaultValue={roomRes?.size}
              />
            </CustomForm.GridRow>
            <CustomForm.GridRow grid="1.5fr 1fr 1fr 1fr">
              <CustomForm.Input
                label="월세"
                name="monthly_fee"
                defaultValue={roomRes?.monthly_fee}
              />
              <CustomForm.Input
                label="전세"
                name="charter_fee"
                defaultValue={roomRes?.charter_fee}
              />
              <CustomForm.Input
                label="위도"
                name="latitude"
                defaultValue={roomRes?.latitude}
              />
              <CustomForm.Input
                label="경도"
                name="longitude"
                defaultValue={roomRes?.longitude}
              />
            </CustomForm.GridRow>
            <CustomForm.GridRow grid="1fr 1fr 1.5fr 2fr">
              <CustomForm.Input
                label="보증금"
                name="deposit"
                defaultValue={roomRes?.deposit}
              />
              <CustomForm.Input
                label="층수"
                name="floor"
                defaultValue={roomRes?.floor}
              />
              <CustomForm.Input
                label="전화번호"
                name="phone"
                defaultValue={roomRes?.phone}
              />
              <CustomForm.Input
                label="주소"
                name="address"
                defaultValue={roomRes?.address}
              />
            </CustomForm.GridRow>
            <S.FormItem label="설명" name="description">
              <Input.TextArea
                defaultValue={roomRes.description}
                showCount
                maxLength={200}
              />
            </S.FormItem>
            <Divider orientation="left">옵션</Divider>

            <S.CheckboxWrap>
              {ROOM_OPTION.map((res) => (
                <CustomForm.Checkbox
                  key={res.name}
                  res={res}
                  defaultValue={roomRes[res.data]}
                  form={form}
                >
                  {res.name}
                </CustomForm.Checkbox>
              ))}
            </S.CheckboxWrap>

            <Divider orientation="left">사진</Divider>
            <S.UpLoadWrap>
              <CustomForm.Upload defaultFileList={imageList || []} />
            </S.UpLoadWrap>
            <S.ButtonWrap>
              <CustomForm.Button
                danger={false}
                icon={<UploadOutlined />}
                htmlType="submit"
              >
                완료
              </CustomForm.Button>
              <CustomForm.Button
                danger
                icon={<DeleteOutlined />}
                onClick={deleteRoom}
              >
                삭제
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
        )}
      </S.FormWrap>
    </S.Container>
  );
}
