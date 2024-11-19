/* eslint-disable no-restricted-imports */
import CustomForm from 'components/common/CustomForm';
import { Divider } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import STORE_OPTION from 'constant/store';
import * as S from '../StoreDetail.style';
import StoreCategory from './StoreCategory';
import OpenTimeForm from './OpenTimeForm';

export default function StoreDetailForm({ form }: { form: FormInstance }) {
  const { required, max, pattern } = CustomForm.validateUtils();

  return (
    <>
      <CustomForm.Input label="id" name="id" disabled />
      <CustomForm.Input label="이름" name="name" rules={[required()]} />
      <CustomForm.GridRow gridColumns="1fr 0.75fr">
        <CustomForm.Input
          label="전화번호"
          name="phone"
          rules={[max(225),
            required,
            pattern(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/, '전화번호 형식을 맞춰주세요')]}
        />
        <CustomForm.InputNumber label="배달비" name="delivery_price" rules={[required]} />
      </CustomForm.GridRow>
      <CustomForm.Input label="주소" name="address" rules={[max(65535), required]} />
      <CustomForm.TextArea label="설명" name="description" maxLength={200} rules={[required]} />
      <CustomForm.Input label="카테고리 목록" name="category_ids" disabled rules={[required]} />
      <StoreCategory form={form} />
      <OpenTimeForm form={form} />
      <Divider orientation="left" style={{ marginTop: '40px' }}>
        옵션
      </Divider>
      <S.CheckboxWrap>
        {STORE_OPTION.map((optionData) => (
          <CustomForm.Checkbox key={optionData.name} name={optionData.data} defaultChecked={false}>
            {optionData.name}
          </CustomForm.Checkbox>
        ))}
      </S.CheckboxWrap>
      <Divider orientation="left" style={{ marginTop: '40px' }}>사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="shops" name="image_urls" form={form} />
      </S.UploadWrap>
    </>
  );
}
