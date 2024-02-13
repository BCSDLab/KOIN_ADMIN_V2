import CustomForm from 'components/common/CustomForm';
import { Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import STORE_OPTION from 'constant/store';
import * as S from './AddStoreModal.style';
import StoreCategory from './components/StoreCategory';
import OpenTimeForm from './components/OpenTimeForm';

export default function AddStoreModal() {
  const { required, max } = CustomForm.useValidate();
  const [form] = CustomForm.useForm();

  return (
    <div>
      <CustomForm.Input label="id" name="id" />
      <CustomForm.GridRow gridColumns="1fr 0.7fr">
        <CustomForm.Input label="이름" name="name" rules={[required()]} />
        <CustomForm.Input label="전화번호" name="phone" rules={[max(225)]} />
      </CustomForm.GridRow>
      <CustomForm.GridRow gridColumns="1fr 0.7fr">
        <CustomForm.Input label="주소" name="address" rules={[max(65535)]} />
        <CustomForm.InputNumber label="배달비" name="delivery_price" />
      </CustomForm.GridRow>
      <CustomForm.TextArea label="설명" name="description" maxLength={200} />
      <CustomForm.Input label="카테고리 목록" name="category_ids" />
      <StoreCategory form={form} /> //이부분 추가 수정 필요
      <OpenTimeForm form={form} /> //이부분 추가 수정 필요
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
      <Divider orientation="left" style={{ marginTop: '40px' }}>사진</Divider>
      <S.UploadWrap>
        <CustomForm.MultipleUpload domain="lands" name="image_urls" form={form} />
      </S.UploadWrap>
      <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
        완료
      </CustomForm.Button>
    </div>
  );
}
