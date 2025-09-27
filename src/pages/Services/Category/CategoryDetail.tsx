import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import categoryQueries from 'queryFactory/categoryQueries';
import * as S from './CategoryDetail.style';
import DetailForm from './components/DetailForm';
import useCategoryMutation from './useCategoryMutation';

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: categoryData } = useQuery(categoryQueries.detail(Number(id)));
  const {
    updateCategory: updateCategoryMutation,
    deleteCategory: deleteCategoryMutation,
  } = useCategoryMutation();
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
            onFinish={updateCategoryMutation.mutate}
          >
            <DetailForm form={form} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              <CustomForm.Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCategoryMutation.mutate(Number(id))}
              >
                삭제
              </CustomForm.Button>
            </S.ButtonWrap>
          </CustomForm>
        </>
      )}
    </S.Container>
  );
}
