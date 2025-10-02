/* eslint-disable @typescript-eslint/no-unused-vars */

import { UploadOutlined } from '@ant-design/icons';
import CustomForm from 'components/common/CustomForm';

import * as S from 'styles/List.style';
import { CreateShopParams, DAY } from 'model/shop.model';
import SHOP_OPTION from 'constant/shop';
import { useEffect } from 'react';
import useShopMutation from './useShopMutation';
import ShopDetailForm from './ShopDetailForm';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export default function AddShopModal({ closeModal }: { closeModal: () => void }) {
  const [form] = CustomForm.useForm<CreateShopParams>();

  const { addShopMutation } = useShopMutation();

  const defaultTimeInfo = DAYS.map((day, index) => {
    return (
      {
        close_time: '00:00',
        closed: false,
        day_of_week: DAY[index],
        open_time: '00:00',
      });
  });

  useEffect(() => {
    SHOP_OPTION.map((optionData) => (
      form.setFieldValue(optionData.data, false)
    ));
    form.setFieldValue('image_urls', []);
  }, [form]);

  const createShop = (values: Partial<CreateShopParams>) => {
    const openField = form.getFieldValue('open');
    addShopMutation.mutate({ ...values, open: openField });
  };

  return (
    <CustomForm
      onFinish={createShop}
      form={form}
      initialValues={{
        open: defaultTimeInfo,
      }}
    >
      <S.DetailFormWrap>
        <ShopDetailForm form={form} />
        <S.SubmitButtonWrap>
          <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
            완료
          </CustomForm.Button>
        </S.SubmitButtonWrap>
      </S.DetailFormWrap>
    </CustomForm>
  );
}
