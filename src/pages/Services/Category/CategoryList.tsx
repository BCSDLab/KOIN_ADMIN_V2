import CustomTable from 'components/common/CustomTable';
import { useGetCategoryListQuery } from 'store/api/category';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import * as S from './CategoryList.style';
import AddCategoryModal from './components/AddCategoryModal';

function CategoryList() {
  const { data: categoryData } = useGetCategoryListQuery();
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();

  return (
    <S.Container>
      <S.Heading>카테고리 목록</S.Heading>
      <S.ModalWrap>
        <CustomForm.Modal
          buttonText="생성"
          title="등록하기"
          width={900}
          footer={null}
          open={isModalOpen}
          onCancel={closeModal}
          onClick={openModal}
        >
          <AddCategoryModal onCancel={closeModal} />
        </CustomForm.Modal>
      </S.ModalWrap>
      {categoryData && (
        <CustomTable
          data={categoryData}
          columnSize={[10, 20, 70]}
        />
      )}

    </S.Container>
  );
}

export default CategoryList;
