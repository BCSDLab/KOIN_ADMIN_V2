import accessClient from 'api';
import type {
  CategoriesResponseV2,
  Category,
  CategoryOrderRequest,
  DropdownCategoryResponse,
} from 'model/category.model';

export const getCategoryList = async (): Promise<CategoriesResponseV2> => {
  const res = await accessClient.get<CategoriesResponseV2>(
    'admin/shops/categories',
    { params: { limit: 20 } },
  );
  return res.data;
};

export const getCategory = async (id: number): Promise<Category> => {
  const res = await accessClient.get<Category>(`admin/shops/categories/${id}`);
  return res.data;
};

export const addCategory = async (body: Partial<Category>): Promise<Category> => {
  const res = await accessClient.post<Category>('admin/shops/categories', body);
  return res.data;
};

export const updateCategory = async (
  params: Partial<Category> & { id: number },
): Promise<Category> => {
  const { id, ...body } = params;
  const res = await accessClient.put<Category>(
    `admin/shops/categories/${id}`,
    body,
  );
  return res.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await accessClient.delete(`admin/shops/categories/${id}`);
};

export const getParentCategory = async (): Promise<DropdownCategoryResponse> => {
  const res = await accessClient.get<DropdownCategoryResponse>(
    'admin/shops/parent-categories',
  );
  return res.data;
};

export const updateCategoryOrder = async (
  body: CategoryOrderRequest,
): Promise<string> => {
  const res = await accessClient.put<string>(
    'admin/shops/categories/order',
    body,
  );
  return res.data;
};
