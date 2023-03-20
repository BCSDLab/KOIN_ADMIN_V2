import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from 'store/api/category';
import * as S from './CategoryDetail.style';

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: categoryData } = useGetCategoryQuery(Number(id));
  const [form] = CustomForm.useForm();

  return (
    <S.Container>
      {categoryData && (
        <>
          <S.Heading>카테고리 상세</S.Heading>
          <S.BreadCrumb>
            {`카테고리 관리 / 카테고리 상세 / ${categoryData.name}`}
          </S.BreadCrumb>
          <CustomForm
            form={form}
            initialValues={categoryData}
          >
            <CustomForm.Input name="id" label="ID" disabled />
            <CustomForm.Input name="name" label="카테고리명" />
            <CustomForm.SingleUpload name="image_url" domain="shops" form={form} />
          </CustomForm>
        </>
      )}
    </S.Container>
  );
}
