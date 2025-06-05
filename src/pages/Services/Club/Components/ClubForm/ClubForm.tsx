import { Divider, FormInstance } from 'antd';
import CustomForm from 'components/common/CustomForm';

interface ClubFormProps {
  form: FormInstance;
  categoryOptions: Record<string, string>;
}

export default function ClubForm({ form, categoryOptions }: ClubFormProps) {
  const { required } = CustomForm.validateUtils();

  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="동아리 ID" name="id" disabled />
        <CustomForm.Input label="동아리 이름" name="name" rules={[required()]} />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="카테고리 ID" name="club_category_id" disabled />
        <CustomForm.Select
          label="카테고리 명"
          name="club_category_name"
          options={categoryOptions}
          rules={[required()]}
        />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr 1fr">
        <CustomForm.Input label="동아리 관리자 ID" name="user_id" rules={[required()]} />
        <CustomForm.Input label="동아리 관리자 이름" name="manager_name" disabled />
        <CustomForm.Input label="동아리 관리자 연락처" name="manager_phone" disabled />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1.5fr 1fr 1fr">
        <CustomForm.Input label="동아리실" name="location" rules={[required()]} />
        <CustomForm.Input label="좋아요" name="likes" disabled />
        <CustomForm.Input label="등록일자" name="created_at" disabled />
      </CustomForm.GridRow>
      <CustomForm.Input label="동아리 소개" name="description" />

      <Divider orientation="left">연락처</Divider>
      <CustomForm.Input label="전화" name="phone_number" />
      <CustomForm.Input label="인스타그램" name="instagram" />
      <CustomForm.Input label="구글폼" name="google_form" />
      <CustomForm.Input label="오픈채팅" name="open_chat" />

      <Divider orientation="left">이미지</Divider>
      <CustomForm.SingleUpload form={form} name="image_url" domain="club" accept="image/*" />

      <Divider orientation="left" style={{ marginTop: '40px' }} />
      <CustomForm.Switch label="활성화 여부" name="is_active" />
    </>
  );
}
