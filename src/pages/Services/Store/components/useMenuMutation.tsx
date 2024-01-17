import { message } from 'antd';
import { MenuBody } from 'model/menus.model';
import { useNavigate } from 'react-router-dom';
import {
  useAddMenuMutation, useDeleteMenuMutation, useUpdateMenuMutation,
} from 'store/api/storeMenu';

export default function useMenuMutation(id:number) {
  const [updateMenuMutation] = useUpdateMenuMutation();
  const [deleteMenuMutation] = useDeleteMenuMutation();
  const [addMenuMutation] = useAddMenuMutation();
  const navigate = useNavigate();

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

  function updateMenu(menuId: number, body: MenuBody[]) {
    return updateMenuMutation({ id, menuId, menuData: body })
      .unwrap()
      .then(() => {
        message.success('정보 수정이 완료되었습니다.');
        navigate(-1);
      })
      .catch(({ data }) => {
        message.error(data.message);
      });
  }

  function addMenu(menuId: number, body: MenuBody[]) {
    return addMenuMutation({ id, menuId, menuData: body })
      .unwrap()
      .then(() => {
        message.success('추가되었습니다.');
      })
      .catch(({ data }) => {
        message.error(data.error.message);
      });
  }

  return {
    updateMenu, deleteMenu, addMenu,
  };
}
