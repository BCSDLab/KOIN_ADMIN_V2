import CustomForm from 'components/common/CustomForm';

export default function DetailForm() {
  return (
    <>
      <CustomForm.Input label="id" name="id" disabled />
      <CustomForm.GridRow gridColumns="1fr 0.7fr">
        <CustomForm.Input label="이름" name="name" disabled />
        <CustomForm.Input label="회원 유형" name="user_type" disabled />
        <CustomForm.Input label="별명" name="nickname" disabled />
        <CustomForm.Input label="성별" name="gender" disabled />
        <CustomForm.Input label="전화번호" name="phone_number" disabled />
        <CustomForm.Input label="이메일" name="email" disabled />
      </CustomForm.GridRow>
      <CustomForm.Input label="사업자 등록 번호" name="company_registration_number" disabled />
      <CustomForm.Input label="가게 정보" name="shops_id" disabled />
      <CustomForm.Input label="첨부자료" name="attachments_id" disabled />
    </>
  );
}
