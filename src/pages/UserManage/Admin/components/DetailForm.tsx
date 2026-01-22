import CustomForm from 'components/common/CustomForm';
import { TRACK_OPTIONS } from 'constant/admin';

interface DetailFormProps {
  isCreate?: boolean;
}

export default function DetailForm({ isCreate = false }: DetailFormProps) {
  const { required, max, pattern } = CustomForm.validateUtils();

  return (
    <>
      {!isCreate && (
        <CustomForm.InputNumber
          label="ID"
          name="id"
          disabled
        />
      )}
      <CustomForm.Input
        label="이름"
        name="name"
        rules={[required(), max(20)]}
      />
      <CustomForm.Input
        label="이메일"
        name="email"
        disabled={!isCreate}
        rules={
          isCreate
            ? [required(), max(50), pattern(/^[a-zA-Z0-9._%+-]+$/, '이메일 형식이 올바르지 않습니다')]
            : undefined
        }
        addonAfter="@koreatech.ac.kr"
      />
      {isCreate && (
        <CustomForm.Input
          label="비밀번호"
          name="password"
          type="password"
          rules={[required(), max(50)]}
        />
      )}
      <CustomForm.Select
        label="트랙"
        name="track_name"
        options={TRACK_OPTIONS}
        rules={[required()]}
      />
    </>
  );
}
