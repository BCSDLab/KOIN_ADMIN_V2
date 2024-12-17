export interface BenefitCategoryResponse {
  benefits: BenefitCategoryContent[]
}

export interface BenefitCategoryContent {
  id: number,
  title: string,
  detail: string,
  on_image_url: string,
  off_image_url: string,
}

export interface GetBenefitShopsResponse {
  count: number;
  shops: ShopInfo[];
}

export interface Shops {
  id: number;
  name: string;
}

export interface ShopInfo extends Shops {
  shop_benefit_map_id: number;
  detail: string;
}

export interface SearchResponse {
  benefit_shops: Shops[];
  non_benefit_shops: Shops[]
}

export interface CreateBenefitRequest {
  title: string;
  detail: string;
  on_image_url: string;
  off_image_url: string;
}

export interface CreateBenefitResponse extends CreateBenefitRequest {
  id: number;
}

export interface DeleteShopsRequest {
  shop_ids: number[];
  id: number;
}

export interface ShopDetail {
  shop_id: number;
  detail: string;
}

export interface AddShopRequest {
  id: number;
  shop_details: ShopDetail[];
}

export interface ModifyBenefitRequest {
  body: CreateBenefitRequest;
  id: number;
}

export interface ModifyBenefitForm extends CreateBenefitRequest { }
