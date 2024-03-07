import { FormInstance } from 'antd';
import CustomForm from 'components/common/CustomForm';

export default function DetailForm({ form }: { form: FormInstance }) {
  return (
    <>
      <CustomForm.Input label="id" name="id" disabled />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="이름" name="name" required />
        <CustomForm.Input label="회원 유형" name="user_type" />
        <CustomForm.Input label="별명" name="nickname" />
        <CustomForm.Input label="성별" name="gender" />
        <CustomForm.Input label="전화번호" name="phone_number" />
        <CustomForm.Input label="이메일" name="email" />
        <CustomForm.Input label="사업자 등록 번호" name="company_registration_number" />
        <CustomForm.Input label="가게 정보" name="shops_id" />
        <CustomForm.Input label="계정 생성 날짜" name="created_at" />
        <CustomForm.Input label="업데이트 날짜" name="updated_at" />
      </CustomForm.GridRow>
      <CustomForm.Input label="마지막 접속 시간" name="last_logged_at" />
      <CustomForm.Checkbox name="is_authed">사장님 인증 여부</CustomForm.Checkbox>
      <CustomForm.MultipleUpload name="attachments_url" domain="owners" form={form} />
    </>
  );
}
