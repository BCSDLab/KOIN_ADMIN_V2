import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import CustomForm from 'components/common/CustomForm';
import ROOM_OPTION from 'constant/roomOption';
import { useParams } from 'react-router-dom';
import { useGetRoomQuery } from 'store/api/room';
import getDefaultValueArr from 'utils/ts/getDefaultValueArr';
import useRoomMutation from './useRoomMutation';
import * as S from './RoomDetail.style';

export default function DetailForm() {
  const { id } = useParams();
  const { data: roomRes } = useGetRoomQuery(Number(id));
  const { updateRoomDetail } = useRoomMutation(Number(id));
  const [form] = CustomForm.useForm();
  const defaultValueArr = getDefaultValueArr(roomRes);

  const imageList: UploadFile[] | undefined = roomRes?.image_urls?.map(
    (res, index) => ({
      uid: `${-(index + 1)}`,
      name: res,
      status: 'done',
      url: res,
    }),
  );

  return (
    <CustomForm
      onFinish={updateRoomDetail}
      form={form}
      fields={defaultValueArr}
    >
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.Input label="방이름" name="name" />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="방종류" name="room_type" />
        <CustomForm.InputNumber label="방크기" name="size" />
      </CustomForm.GridRow>

      <CustomForm.Input label="월세" name="monthly_fee" />
      <CustomForm.Input label="전세" name="charter_fee" />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="관리비" name="management_fee" />
        <CustomForm.Input label="보증금" name="deposit" />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.InputNumber label="위도" name="latitude" />
        <CustomForm.InputNumber label="경도" name="longitude" />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.InputNumber label="층수" name="floor" />
        <CustomForm.Input label="전화번호" name="phone" />
      </CustomForm.GridRow>
      <CustomForm.Input label="주소" name="address" />
      <CustomForm.TextArea label="설명" name="description" maxLength={200} />

      <Divider orientation="left" style={{ marginTop: '40px' }}>옵션</Divider>
      <S.CheckboxWrap>
        {ROOM_OPTION.map((optionData) => roomRes && (
          <CustomForm.Checkbox
            key={optionData.name}
            name={optionData.data}
          >
            {optionData.name}
          </CustomForm.Checkbox>
        ))}
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
