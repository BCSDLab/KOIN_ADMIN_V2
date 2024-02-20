/* eslint-disable no-restricted-imports */
import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';

import { message } from 'antd';
import * as S from 'styles/List.style';
import { StoreResponse } from 'model/store.model';
import STORE_OPTION from 'constant/store';
import { useEffect } from 'react';
import useStoreMutation from './useStoreMutation';
import StoreDetailForm from './StoreDetailForm';

export default function AddStoreModal({ closeModal }: { closeModal: () => void }) {
  const [form] = CustomForm.useForm();
  const { addStore } = useStoreMutation(1);

  useEffect(() => {
    STORE_OPTION.map((optionData) => (
      form.setFieldValue(optionData.data, false)
    ));
  }, [form]);

  const createStore = (values: Partial<StoreResponse>) => {
    // open 데이터 fetching 예외 처리
    values.open = form.getFieldValue('open');
    addStore(values, {
      onSuccess: () => {
        message.success('정보 추가가 완료되었습니다.');
        closeModal();
        form.resetFields();
      },
      onError: (errorMessage) => {
        message.error(errorMessage);
      },
    });
    // .then(() => {
    //   closeModal();
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
