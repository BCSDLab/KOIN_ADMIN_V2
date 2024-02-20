import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { useGetMenuQuery } from 'store/api/storeMenu';
import MenuDetailForm from './MenuDetailForm';

export default function MenuDetail({ menuId, form }:{ menuId?: number, form: FormInstance }) {
  const { id } = useParams();
  const skip = menuId === undefined;
  const { data: storeMenu } = useGetMenuQuery({ id: Number(id), menuId }, { skip });

  // form 초기화
  form.setFieldsValue(storeMenu);
  form.setFieldValue('image_urls', storeMenu?.image_urls);

  return (
    <div>
      {storeMenu
      && <MenuDetailForm form={form} storeMenu={storeMenu} />}
    </div>
  );
}
