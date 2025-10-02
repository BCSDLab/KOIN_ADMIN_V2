import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import SHOP_OPTION from 'constant/shop';
import { CreateShopParams, DAY } from 'model/shop.model';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import * as S from 'styles/Detail.style';
import * as L from './ShopWrite.style';
import useShopMutation from './components/useShopMutation';
import ShopDetailForm from './components/ShopDetailForm';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const DEFAULT_TIME_TEMPLATE = (index:number) => ({
  close_time: '00:00',
  closed: false,
  day_of_week: DAY[index],
  open_time: '00:00',
});

const defaultTimeInfo = DAYS.map((_, index) => DEFAULT_TIME_TEMPLATE(index));

export default function ShopWrite() {
  const navigate = useNavigate();
  const [form] = CustomForm.useForm<CreateShopParams>();
  const { addShopMutation } = useShopMutation();

  const buildFinalAddress = () => {
    const base = (form.getFieldValue('address') ?? '').toString().trim();
    const detail = (form.getFieldValue('address_detail') ?? '').toString().trim();
    return [base, detail].filter(Boolean).join(' ');
  };

  const createShop = (values: Partial<CreateShopParams>) => {
    const openField = form.getFieldValue('open');
    const finalAddress = buildFinalAddress();

    const payload = {
      ...values,
      address: finalAddress,
      open: openField,
    } as Partial<CreateShopParams>;

    addShopMutation.mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    SHOP_OPTION.forEach((optionData) => {
      form.setFieldValue(optionData.data, false);
    });
    form.setFieldValue('image_urls', []);
  }, [form]);

  return (
    <S.Container>
      <L.HeadingWrapper>
        <DetailHeading>Shop Create</DetailHeading>
      </L.HeadingWrapper>
      <CustomForm
        onFinish={createShop}
        form={form}
        initialValues={{
          open: defaultTimeInfo,
        }}
      >
        <L.DetailFormWrap>
          <ShopDetailForm form={form} />

          <Flex justify="end" gap="10px">
            <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
              완료
            </CustomForm.Button>

            <CustomForm.Button
              type="default"
              onClick={() => navigate(-1)}
            >
              취소
            </CustomForm.Button>
          </Flex>
        </L.DetailFormWrap>
      </CustomForm>
    </S.Container>
  );
}
