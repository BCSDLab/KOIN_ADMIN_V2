export enum DAY {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

export interface MenuCategoriesModel {
  id: number;
  name: string;
}

export interface ShopOpen {
  close_time: string;
  closed: boolean;
  day_of_week: typeof DAY;
  open_time: string;
}

export interface ShopCategoriesModel {
  id: number;
  name: string;
}

export interface ShopResponse {
  address: string;
  delivery: true;
  delivery_price: number;
  description: string;
  id: number;
  image_urls: string[];
  is_deleted: false;
  menu_categories: MenuCategoriesModel[];
  name: string;
  open: ShopOpen[];
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
  shop_categories: ShopCategoriesModel[];
  main_category_id: number;
}

export interface ShopDetailForm extends ShopResponse {
  category_ids: number[];
}

export interface ShopTableHead {
  category_names: string[];
  id: number;
  is_deleted: boolean;
  name: string;
  phone: number;
}

export interface ShopTransformHead {
  category_names: string;
  id: number;
  is_deleted: boolean;
  name: string;
  phone: number;
}

export interface ShopsResponse {
  current_count: number;
  current_page: number;
  shops: ShopTableHead[],
  total_count: number;
  total_page: number;
}

export interface ShopTransformResponse {
  current_count: number;
  current_page: number;
  shops: ShopTransformHead[],
  total_count: number;
  total_page: number;
}

export interface ShopParams {
  page: number;
  is_deleted: boolean;
}

export interface CreateShopParams {
  address: string;
  address_detail: string
  category_ids: number[];
  delivery: true;
  delivery_price: number;
  description: string;
  image_urls: string[];
  name: string;
  open: ShopOpen[];
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
  main_category_id: number;
}

export interface ModifyShopParams extends CreateShopParams {
  phone: string;
  bank: string;
  account_number: string;
}
