import { message } from 'antd';
import { Menu, MenuBody } from 'model/menus.model';
import {
  useAddMenuMutation, useDeleteMenuMutation, useUpdateMenuMutation,
} from 'store/api/storeMenu';

export default function useMenuMutation(id: number) {
  const [updateMenuMutation] = useUpdateMenuMutation();
  const [deleteMenuMutation] = useDeleteMenuMutation();
  const [addMenuMutation] = useAddMenuMutation();

  function deleteMenu(menuId: number) {
    return deleteMenuMutation({ id, menuId })
      .unwrap()
      .then(() => {
        message.success('삭제되었습니다.');
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function updateMenu(menuId: number, body: MenuBody) {
    return updateMenuMutation({ id, menuId, menuData: body })
      .unwrap()
      .then(() => {})
      .catch(() => {
        message.error('메뉴 수정에 실패했습니다.');
      });
  }

  const addMenu = (formData: Menu, {
    onSuccess,
    onError,
  }: {
    onSuccess?: () => void, onError?: ({ message, violations }:
    { message: string; violations: string[] }) => void
  } = {}) => {
    addMenuMutation({ id, formData })
      .unwrap()
      .then(() => {
        onSuccess?.();
      })
      .catch((error) => {
        onError?.({ message: error.data.message, violations: error.data.violations });
      });
  };

  return {
    updateMenu, deleteMenu, addMenu,
  };
}
