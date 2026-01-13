import CustomForm from 'components/common/CustomForm';
import { TRACK_OPTIONS, TEAM_OPTIONS } from 'constant/admin';

export default function DetailForm() {
  const { required, max, pattern } = CustomForm.validateUtils();

  return (
    <>
      <CustomForm.Input
        label="이름"
        name="name"
        rules={[required(), max(20)]}
      />
      <CustomForm.Input
        label="이메일"
        name="email"
        rules={[
          required(),
          max(50),
          pattern(/^[a-zA-Z0-9._%+-]+$/, '이메일 형식이 올바르지 않습니다'),
        ]}
        addonAfter="@koreatech.ac.kr"
      />
      <CustomForm.Input
        label="비밀번호"
        name="password"
        type="password"
        rules={[required(), max(50)]}
      />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Select
          label="트랙"
          name="track_name"
          options={TRACK_OPTIONS}
          rules={[required()]}
        />
        <CustomForm.Select
          label="팀"
          name="team_name"
          options={TEAM_OPTIONS}
          rules={[required()]}
        />
      </CustomForm.GridRow>
    </>
  );
}
