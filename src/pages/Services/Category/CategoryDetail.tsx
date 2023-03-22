import CustomForm from 'components/common/CustomForm';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from 'store/api/category';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import * as S from './CategoryDetail.style';
import DetailForm from './components/DetailForm';
import useCategoryMutation from './useCategoryMutation';

export default function CategoryDetail() {
  const { id } = useParams();
  const { data: categoryData } = useGetCategoryQuery(Number(id));
  const { updateCategory, deleteCategory } = useCategoryMutation();
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
            onFinish={updateCategory}
          >
            <DetailForm form={form} />
            <S.ButtonWrap>
              <CustomForm.Button icon={<UploadOutlined />} htmlType="submit">
                완료
              </CustomForm.Button>
              <CustomForm.Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCategory(Number(id))}
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
