/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';

import { message } from 'antd';
import * as S from 'styles/List.style';
import { StoreResponse } from 'model/store.model';
import STORE_OPTION from 'constant/store';
import useStoreMutation from './components/useStoreMutation';
import StoreDetailForm from './components/StoreDetailForm';

export default function AddStoreModal({ onCancel }: { onCancel: () => void }) {
  const [form] = CustomForm.useForm();
  const { addStore } = useStoreMutation(1);

  STORE_OPTION.map((optionData) => (
    form.setFieldValue(optionData.data, false)
  ));

  const createStore = (values: Partial<StoreResponse>) => {
    // open 객체 데이터 fetching 되지않아 재할당
    values.open = form.getFieldValue('open');
    addStore(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        onCancel();
        form.resetFields();
      },
      onError: (errorMessage: any) => {
        message.error(errorMessage);
      },
    });
    // .then(() => {
    //   onCancel();
    //   form.resetFields();
    // })
    // .catch();
  };

  return (
    <CustomForm
      onFinish={createStore}
      form={form}
    >
      <S.DetailFormWrap>
        <StoreDetailForm form={form} />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
