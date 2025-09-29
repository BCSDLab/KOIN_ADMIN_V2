import accessClient from 'api';
import {
  BenefitCategoryResponse,
  GetBenefitShopsResponse,
  SearchResponse,
  CreateBenefitResponse,
  CreateBenefitRequest,
  DeleteShopsRequest,
  AddShopRequest,
  ModifyBenefitRequest,
  ModifyBenefitDetails,
} from 'model/benefit.model';

export const getBenefitCategory = async (): Promise<BenefitCategoryResponse> => {
  const { data } = await accessClient.get<BenefitCategoryResponse>('admin/benefit/categories');
  return data;
};

export const getBenefitShops = async (id?: number): Promise<GetBenefitShopsResponse> => {
  const { data } = await accessClient.get<GetBenefitShopsResponse>(`admin/benefit/${id}/shops`);
  return data;
};

export const searchShops = async ({
  id,
  keyword,
}: {
  id?: number;
  keyword: string;
}): Promise<SearchResponse> => {
  const { data } = await accessClient.get<SearchResponse>(
    `admin/benefit/${id}/shops/search?search_keyword=${keyword}`,
  );
  return data;
};

export const createBenefitCategory = async (
  body: CreateBenefitRequest,
): Promise<CreateBenefitResponse> => {
  const { data } = await accessClient.post<CreateBenefitResponse>('admin/benefit/categories', body);
  return data;
};

export const deleteBenefitCategory = async ({ id }: { id: number }): Promise<void> => {
  await accessClient.delete(`admin/benefit/categories/${id}`);
};

export const deleteBenefitShops = async ({ id, shop_ids }: DeleteShopsRequest): Promise<void> => {
  await accessClient.delete(`admin/benefit/${id}/shops`, { data: { shop_ids } });
};

export const addBenefitShops = async ({ id, shop_details }: AddShopRequest): Promise<void> => {
  await accessClient.post(`admin/benefit/${id}/shops`, { shop_details });
};

export const modifyBenefitCategory = async ({ id, body }: ModifyBenefitRequest): Promise<void> => {
  await accessClient.put(`admin/benefit/categories/${id}`, body);
};

export const modifyBenefitDetails = async (
  { modify_details }: ModifyBenefitDetails,
): Promise<void> => {
  await accessClient.put('admin/benefit', { modify_details });
};
