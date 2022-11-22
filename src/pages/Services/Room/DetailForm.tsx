import React from 'react';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import CustomForm from 'components/common/CustomForm';
import { ROOM_INPUT, ROOM_OPTION } from 'constant/roomOption';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery } from 'store/api/room';
import useRoomMutation from './useRoomMutation';
import * as S from './RoomDetail.style';

export default function DetailForm() {
  const { id } = useParams();
  const { data: roomRes } = useGetRoomQuery(Number(id));
  const { onSubmitRoomForm } = useRoomMutation(Number(id));

  const [form] = CustomForm.useForm();

  const imageList: UploadFile[] | undefined = roomRes?.image_urls?.map(
    (res, index) => ({
      uid: `${-(index + 1)}`,
      name: res,
      status: 'done',
      url: res,
    }),
  );

  const defaultValueArr = ROOM_INPUT.map(
    (inputRes) => ({
      name: [inputRes],
      value: roomRes && roomRes[inputRes],
    }),
  );

  console.log(defaultValueArr);

  return (
    <CustomForm
      onFinish={onSubmitRoomForm}
      form={form}
      fields={defaultValueArr}
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
      <CustomForm.TextArea label="설명" name="description" maxLength={200} />
      <Divider orientation="left">옵션</Divider>

      <S.CheckboxWrap>
        {ROOM_OPTION.map(
          (optionRes) => roomRes && (
          <CustomForm.Checkbox
            key={optionRes.name}
            res={optionRes}
            defaultChecked={roomRes[optionRes.data]}
            form={form}
          >
            {optionRes.name}
          </CustomForm.Checkbox>
          ),
        )}
      </S.CheckboxWrap>

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.Upload defaultFileList={imageList || []} />
      </S.UploadWrap>
      <S.ButtonWrap>
        <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
          완료
        </CustomForm.Button>
        <CustomForm.Button danger icon={<DeleteOutlined />}>
          삭제
        </CustomForm.Button>
      </S.ButtonWrap>
    </CustomForm>
  );
}
