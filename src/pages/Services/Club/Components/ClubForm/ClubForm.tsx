import { Divider, FormInstance } from 'antd';
import CustomForm from 'components/common/CustomForm';
import CLUB_OPTION from 'constant/club';

interface ClubFormProps {
  form: FormInstance;
}

export default function ClubForm({ form }: ClubFormProps) {
  const { required } = CustomForm.validateUtils();

  // 임시 옵션
  const categoryOptionMap = CLUB_OPTION.slice(1).reduce((acc, option) => {
    acc[option.id] = option.name;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="동아리 ID" name="id" disabled />
        <CustomForm.Input label="동아리 이름" name="title" rules={[required()]} />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="카테고리 ID" name="club_category_id" disabled />
        <CustomForm.Select
          label="카테고리 명"
          name="club_category"
          options={categoryOptionMap}
        />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="동아리 관리자 ID" name="id" />
        <CustomForm.Input label="동아리 관리자 이름" name="title" />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1.5fr 1fr 1fr">
        <CustomForm.Input label="동아리실" name="room" />
        <CustomForm.Input label="좋아요" name="like" disabled />
        <CustomForm.Input label="등록일자" name="created_at" disabled />
      </CustomForm.GridRow>
      <CustomForm.Input label="동아리 소개" name="description" />

      <Divider orientation="left">연락처</Divider>
      <CustomForm.Input label="전화" name="phone" />
      <CustomForm.Input label="인스타그램" name="instagram" />
      <CustomForm.Input label="구글폼" name="google_form" />
      <CustomForm.Input label="오픈채팅" name="kakao" />

      <Divider orientation="left">이미지</Divider>
      <CustomForm.SingleUpload form={form} name="image_url" domain="banner" accept="image/*" />

      <Divider orientation="left" style={{ marginTop: '40px' }} />
      <CustomForm.Switch label="활성화 여부" name="is_active" />
    </>
  );
}
