import type { Menu, MenuBody } from 'model/shopMenus.model';
import { useMutation } from '@tanstack/react-query';
import { addMenu, updateMenu, deleteMenu } from 'api/shopMenu';

export default function useMenuMutation(shopId: number) {
  const deleteMenuMutation = useMutation({
    mutationFn: (menuId:number) => deleteMenu({ id: shopId, menuId }),
  });

  const updateMenuMutation = useMutation({
    mutationFn: (payload:{ menuId: number, body: MenuBody }) => updateMenu(
      { id: shopId, menuId: payload.menuId, menuData: payload.body },
    ),
  });

  const addMenuMutation = useMutation({
    mutationFn: (formData: Menu) => addMenu({ id: shopId, formData }),
  });

  return {
    updateMenuMutation,
    deleteMenuMutation,
    addMenuMutation,
    isDeleting: deleteMenuMutation.isPending,
  };
}
