import CustomTable from 'components/common/CustomTable';
import useBooleanState from 'utils/hooks/useBoolean';
import CustomForm from 'components/common/CustomForm';
import { Button } from 'antd';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import categoryQueries from 'queryFactory/categoryQueries';
import { updateCategoryOrder } from 'api/category';
import * as S from './CategoryList.style';
import AddCategoryModal from './components/AddCategoryModal';

interface OrderData {
  id: number;
  name: string;
}

function OrderCategory({ orderData }: { orderData: OrderData[] }) {
  const [items, setItems] = useState(orderData);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const { mutate: reorder } = useMutation({
    mutationFn: updateCategoryOrder,
  });

  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 드래그 대상이 드롭 가능하도록 설정
  };

  const handleDrop = (index: number) => {
    if (draggedItem === null) return;

    // 아이템 순서 변경
    const updatedItems = [...items];
    const [removedItem] = updatedItems.splice(draggedItem, 1);
    updatedItems.splice(index, 0, removedItem);

    setItems(updatedItems);
    setDraggedItem(null);
    reorder({
      shop_category_ids: updatedItems.map((item) => item.id),
    });
  };

  return (
    <>
      {items.map((item, index) => (
        <Button
          draggable
          key={item.id}
          onDragOver={handleDragOver}
          onDragStart={() => handleDragStart(index)}
          onDrop={() => handleDrop(index)}
        >
          {item.name}
        </Button>
      ))}
    </>
  );
}

function CategoryList() {
  const { data: categoryData } = useQuery(categoryQueries.list());
  const { value: isModalOpen, setTrue: openModal, setFalse: closeModal } = useBooleanState();

  const orderData = categoryData?.map((category) => ({
    id: category.id,
    name: category.name,
  }));

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
          columnSize={[10, 20, 20, 20, 30]}
        />
      )}
      {orderData && <OrderCategory orderData={orderData} />}

    </S.Container>
  );
}

export default CategoryList;
