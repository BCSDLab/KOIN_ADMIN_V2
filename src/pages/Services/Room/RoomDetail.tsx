import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider, Form } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import CustomForm from 'components/common/CustomForm';
import { ROOM_INPUT, ROOM_OPTION } from 'constant/roomOption';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery } from 'store/api/Room';
import * as S from './RoomDetail.style';
import useRoomMutation from './useRoomMutation';

export default function RoomDetail() {
  const { id }: any = useParams();
  const { data: roomRes } = useGetRoomQuery(id);
  const { onSubmitRoomForm }: any = useRoomMutation(id);

  const [form] = Form.useForm();

  const imageList: UploadFile[] | undefined = roomRes?.image_urls?.map(
    (res, index) => ({
      uid: `${-(index + 1)}`,
      name: res,
      status: 'done',
      url: res,
    }),
  );

  const DefaultValueArr = ROOM_INPUT.map(
    (res) => ({
      name: [res],
      value: roomRes && roomRes[res],
    }),
  );

  return (
    <S.Container>
      <S.Heading>Room Detail</S.Heading>
      <S.SubHeading>Home / Room / RoomDetail</S.SubHeading>
      <Divider />
      <S.FormWrap>
        {roomRes && (
          <CustomForm
            onFinish={onSubmitRoomForm}
            form={form}
            fields={DefaultValueArr}
          >
            <CustomForm.GridRow gridColumns="1.5fr 1fr 1fr 1fr">
              <CustomForm.Input label="방이름" name="name" />
              <CustomForm.Input label="방종류" name="room_type" />
              <CustomForm.Input label="관리비" name="management_fee" />
              <CustomForm.Input label="방크기" name="size" />
            </CustomForm.GridRow>
            <CustomForm.GridRow gridColumns="1.5fr 1fr 1fr 1fr">
              <CustomForm.Input label="월세" name="monthly_fee" />
              <CustomForm.Input label="전세" name="charter_fee" />
              <CustomForm.Input label="위도" name="latitude" />
              <CustomForm.Input label="경도" name="longitude" />
            </CustomForm.GridRow>
            <CustomForm.GridRow gridColumns="1fr 1fr 1.5fr 2fr">
              <CustomForm.Input label="보증금" name="deposit" />
              <CustomForm.Input label="층수" name="floor" />
              <CustomForm.Input label="전화번호" name="phone" />
              <CustomForm.Input label="주소" name="address" />
            </CustomForm.GridRow>
            <CustomForm.TextArea
              label="설명"
              name="description"
              maxLength={200}
            />
            <Divider orientation="left">옵션</Divider>

            <S.CheckboxWrap>
              {ROOM_OPTION.map((res) => (
                <div key={res.name}>
                  <CustomForm.Checkbox
                    res={res}
                    defaultChecked={roomRes[res.data]}
                    form={form}
                  >
                    {res.name}
                  </CustomForm.Checkbox>
                </div>
              ))}
            </S.CheckboxWrap>

            <Divider orientation="left">사진</Divider>
            <S.UploadWrap>
              <CustomForm.Upload defaultFileList={imageList || []} />
            </S.UploadWrap>
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
                // onClick={deleteForm}
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
