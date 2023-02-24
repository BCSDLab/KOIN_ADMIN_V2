/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import React from 'react';
import { Divider } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import * as S from '../StoreDetail.style';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required, max, pattern } = CustomForm.useValidate();

  return (
    <>
      <CustomForm.Input label="uid" name="uid" disabled />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="이름" name="name" rules={[required()]} />
        <CustomForm.InputNumber label="카테고리" name="category" />
      </CustomForm.GridRow>

      <CustomForm.Input label="월세" name="monthly_fee" rules={[max(225)]} />
      <CustomForm.Input label="전세" name="charter_fee" rules={[max(20)]} />
      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.Input label="관리비" name="management_fee" rules={[max(225)]} />
        <CustomForm.Input label="보증금" name="deposit" rules={[max(225)]} />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.InputNumber label="위도" name="latitude" />
        <CustomForm.InputNumber label="경도" name="longitude" />
      </CustomForm.GridRow>

      <CustomForm.GridRow gridColumns="1fr 1fr">
        <CustomForm.InputNumber
          label="층수"
          name="floor"
          rules={[pattern(/^(0|[1-9]+[0-9]*)$/, '층수가 올바르지않습니다.')]}
        />
        <CustomForm.Input
          label="전화번호"
          name="phone"
        />
      </CustomForm.GridRow>
      <CustomForm.Input label="주소" name="address" rules={[max(65535)]} />
      <CustomForm.TextArea
        label="설명"
        name="description"
        maxLength={200}
      />

      <Divider orientation="left" style={{ marginTop: '40px' }}>
        옵션
      </Divider>
      <S.CheckboxWrap>
        {Store_OPTION.map(
          (optionData) => (
            <CustomForm.Checkbox
              key={optionData.name}
              name={optionData.data}
            >
              {optionData.name}
            </CustomForm.Checkbox>
          ),
        )}
      </S.CheckboxWrap>

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="lands" name="image_urls" form={form} />
      </S.UploadWrap>
    </>
  );
}
