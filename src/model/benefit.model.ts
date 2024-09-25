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
  shops: Shops[];
}

export interface Shops {
  id: number;
  name: string;
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
