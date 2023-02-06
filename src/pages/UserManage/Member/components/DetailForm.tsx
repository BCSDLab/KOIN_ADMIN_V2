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
      <CustomForm.Input label="이름" name="name" />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Select label="트랙" name="track" options={SELECT_OPTIONS.track} />
        <CustomForm.Select label="직책" name="position" options={SELECT_OPTIONS.position} />
      </CustomForm.GridRow>
      <CustomForm.Input label="이메일" name="email" />
      <CustomForm.InputNumber label="학번" name="student_number" />

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.SingleUpload domain="members" name="image_url" form={form} />
      </S.UploadWrap>
    </>
  );
}