/* eslint-disable @typescript-eslint/no-unused-vars */

import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';

import { message } from 'antd';
import * as S from 'styles/List.style';
import { DAY, StoreResponse } from 'model/store.model';
import STORE_OPTION from 'constant/store';
import { useEffect } from 'react';
import useStoreMutation from './useStoreMutation';
import StoreDetailForm from './StoreDetailForm';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function AddStoreModal({ closeModal }: { closeModal: () => void }) {
  const [form] = CustomForm.useForm();
  const { addStore } = useStoreMutation(1);

  useEffect(() => {
    STORE_OPTION.map((optionData) => (
      form.setFieldValue(optionData.data, false)
    ));
  }, [form]);

  const defaultTimeInfo = DAYS.map((day, index) => {
    return (
      {
        close_time: '00:00',
        closed: false,
        day_of_week: DAY[index],
        open_time: '00:00',
      });
  });

  const createStore = (values: Partial<StoreResponse>) => {
    const data = form.getFieldsValue(true);
    addStore(data, {
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
      initialValues={{ open: defaultTimeInfo }}
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
