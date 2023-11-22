/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import { Divider } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import STORE_OPTION from 'constant/store';
import CustomProList from 'components/common/CustomForm/CustomProList';
import * as S from '../StoreDetail.style';
import StoreCategory from './StoreCategory';
import OpenTimeForm from './OpenTimeForm';

export default function DetailForm({ form }: { form: FormInstance }) {
  const { required, max } = CustomForm.useValidate();

  return (
    <>
      <CustomForm.Input label="id" name="id" disabled />
      <CustomForm.GridRow gridColumns="1fr 0.7fr">
        <CustomForm.Input label="이름" name="name" rules={[required()]} />
        <CustomForm.Input label="전화번호" name="phone" rules={[max(225)]} />
      </CustomForm.GridRow>
      <CustomForm.GridRow gridColumns="1fr 0.7fr">
        <CustomForm.Input label="주소" name="address" rules={[max(65535)]} />
        <CustomForm.InputNumber label="배달비" name="delivery_price" />
      </CustomForm.GridRow>
      <CustomForm.TextArea label="설명" name="description" maxLength={200} />
      <CustomForm.Input label="카테고리 목록" name="category_ids" disabled />

      <StoreCategory form={form} />

      <OpenTimeForm form={form} />

      <Divider orientation="left" style={{ marginTop: '40px' }}>
        옵션
      </Divider>
      <S.CheckboxWrap>
        {STORE_OPTION?.map((optionData) => (
          <CustomForm.Checkbox key={optionData.name} name={optionData.data}>
            {optionData.name}
          </CustomForm.Checkbox>
        ))}
      </S.CheckboxWrap>

      <Divider orientation="left">사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="lands" name="image_urls" form={form} />
      </S.UploadWrap>
      <CustomProList form={form} />
    </>
  );
}
