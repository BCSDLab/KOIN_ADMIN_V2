/* eslint-disable no-restricted-imports */
import { Divider } from 'antd';
import CustomForm from 'components/common/CustomForm';
import { SELECT_OPTIONS } from 'constant/member';
import { FormInstance } from 'antd/es/form/Form';
import * as S from '../MemberDetail.style';

export default function DetailForm({ form }: { form: FormInstance }) {
  return (
    <>
      <Divider orientation="left">기본 정보</Divider>
      <CustomForm.InputNumber label="ID" name="id" disabled />
      <CustomForm.Input
        label="이름"
        name="name"
        rules={[{
          required: true,
          max: 20,
          message: '최대 20자 이내로 입력해주세요',
        }]}
      />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Select
          label="트랙"
          name="track"
          options={SELECT_OPTIONS.track}
          rules={[{
            required: true,
            message: '트랙을 선택해주세요',
          }]}
        />
        <CustomForm.Select
          label="직책"
          name="position"
          options={SELECT_OPTIONS.position}
          rules={[{
            required: true,
            message: '직책을 선택해주세요',
          }]}
        />
      </CustomForm.GridRow>
      <CustomForm.Input
        label="이메일"
        name="email"
        rules={[{
          max: 100,
          message: '최대 100자 이내로 입력해주세요',
        }]}
      />
      <CustomForm.Input
        label="학번"
        name="student_number"
        rules={[
          {
            pattern: /^[0-9]+$/,
            message: '숫자만 입력 가능합니다',
          },
          {
            max: 10,
            message: '최대 10자 이내로 입력해주세요',
          }]}
      />

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.SingleUpload domain="members" name="image_url" form={form} />
      </S.UploadWrap>
    </>
  );
}
