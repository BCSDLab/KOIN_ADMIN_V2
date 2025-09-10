import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import STORE_OPTION from 'constant/store';
import { CreateStoreParams, DAY } from 'model/store.model';
import CustomForm from 'components/common/CustomForm';
import DetailHeading from 'components/common/DetailHeading';
import * as S from 'styles/Detail.style';
import * as L from './StoreWrite.style';
import useStoreMutation from './components/useStoreMutation';
import StoreDetailForm from './components/StoreDetailForm';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

const DEFAULT_TIME_TEMPLATE = (index:number) => ({
  close_time: '00:00',
  closed: false,
  day_of_week: DAY[index],
  open_time: '00:00',
});

const defaultTimeInfo = DAYS.map((_, index) => DEFAULT_TIME_TEMPLATE(index));

export default function StoreWrite() {
  const navigate = useNavigate();
  const [form] = CustomForm.useForm<CreateStoreParams>();
  const { addStore } = useStoreMutation(1);

  const buildFinalAddress = () => {
    const base = (form.getFieldValue('address') ?? '').toString().trim();
    const detail = (form.getFieldValue('address_detail') ?? '').toString().trim();
    return [base, detail].filter(Boolean).join(' ');
  };

  const createStore = (values: Partial<CreateStoreParams>) => {
    const openField = form.getFieldValue('open');
    const finalAddress = buildFinalAddress();

    const payload = {
      ...values,
      address: finalAddress,
      open: openField,
    } as Partial<CreateStoreParams>;

    addStore(
      payload,
      {
        onSuccess: () => {
          message.success('정보 추가가 완료되었습니다.');
          form.resetFields();
          navigate(-1);
        },
        onError: (errorMessage) => {
          message.error(errorMessage);
        },
      },
    );
  };

  useEffect(() => {
    STORE_OPTION.forEach((optionData) => {
      form.setFieldValue(optionData.data, false);
    });
    form.setFieldValue('image_urls', []);
  }, [form]);

  return (
    <S.Container>
      <L.HeadingWrapper>
        <DetailHeading>Store Create</DetailHeading>
      </L.HeadingWrapper>
      <CustomForm
        onFinish={createStore}
        form={form}
        initialValues={{
          open: defaultTimeInfo,
        }}
      >
        <L.DetailFormWrap>
          <StoreDetailForm form={form} />

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
