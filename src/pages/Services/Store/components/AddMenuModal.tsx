import CustomProForm from 'components/common/CustomProForm';
import { useGetMenuListQuery } from 'store/api/storeMenu';
import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MenuDetailForm from './MenuDetailForm';
import * as S from './StoreMenus.style';

export default function AddMenuModal({ menuId }: { menuId: number | null }) {
  const [form] = CustomForm.useForm();
  const { id } = useParams();
  const { data: storeMenuDetailData } = useGetMenuListQuery({
    id: Number(id), menuId: Number(menuId),
  });

  useEffect(() => {
    if (storeMenuDetailData) {
      form.setFieldsValue(storeMenuDetailData);
    } else {
      form.resetFields();
    }
  }, [form, storeMenuDetailData]);

  return (
    <S.Container>
      {storeMenuDetailData && (
        <CustomProForm
          form={form}
          initialValues={storeMenuDetailData}
          name="storeMenuDetail"
          submitter={false}
        >
          <S.DetailFormWrap>
            <MenuDetailForm form={form} />
          </S.DetailFormWrap>
        </CustomProForm>
      )}
    </S.Container>
  );
}
