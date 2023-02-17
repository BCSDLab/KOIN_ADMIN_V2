/* eslint-disable no-restricted-imports */
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { SELECT_OPTIONS } from 'constant/member';
import { FormInstance } from 'antd/es/form/Form';
import * as S from '../MemberDetail.style';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { Required, Max, Pattern } = CustomForm.useValidate();

  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.InputNumber label="ID" name="id" disabled />
      <CustomForm.Input
        label="이름"
        name="name"
        rules={[Required(), Max(20)]}
      />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Select
          label="트랙"
          name="track"
          options={SELECT_OPTIONS.track}
          rules={[Required()]}
        />
        <CustomForm.Select
          label="직책"
          name="position"
          options={SELECT_OPTIONS.position}
          rules={[Required()]}
        />
      </CustomForm.GridRow>
      <CustomForm.Input
        label="이메일"
        name="email"
        rules={[Max(100)]}
      />
      <CustomForm.Input
        label="학번"
        name="student_number"
        rules={[Pattern(/^[0-9]+$/, '숫자만 입력 가능합니다'), Max(10)]}
      />

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.SingleUpload domain="members" name="image_url" form={form} />
      </S.UploadWrap>
    </>
  );
}
