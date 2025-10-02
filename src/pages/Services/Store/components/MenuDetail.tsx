import { useParams } from 'react-router-dom';
import { FormInstance } from 'antd/lib/form';
import { useQuery } from '@tanstack/react-query';
import shopMenuQueries from 'queryFactory/shopMenuQueries';
import MenuDetailForm from './MenuDetailForm';

export default function MenuDetail({ menuId, form }:{ menuId?: number, form: FormInstance }) {
  const { id } = useParams();

  const { data: shopMenu } = useQuery({
    ...shopMenuQueries
      .detail({ id: Number(id), menuId: menuId! }),
  });

  // form 초기화
  form.setFieldsValue(shopMenu);
  form.setFieldValue('image_urls', shopMenu?.image_urls);

  return (
    <div>
      {shopMenu
      && <MenuDetailForm form={form} shopMenu={shopMenu} />}
    </div>
  );
}
