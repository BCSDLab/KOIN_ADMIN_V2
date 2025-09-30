import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { useQuery } from '@tanstack/react-query';
import shopMenuQueries from 'queryFactory/shopMenuQueries';
import MenuDetailForm from './MenuDetailForm';

export default function MenuDetail({ menuId, form }:{ menuId?: number, form: FormInstance }) {
  const { id } = useParams();

  const { data: storeMenu } = useQuery({
    ...shopMenuQueries
      .detail({ id: Number(id), menuId: menuId! }),
  });

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
