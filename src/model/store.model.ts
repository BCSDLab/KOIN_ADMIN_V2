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

export interface StoreOpen {
  close_time: string;
  closed: boolean;
  day_of_week: typeof DAY;
  open_time: string;
}

export interface ShopCategoriesModel {
  id: number;
  name: string;
}

export interface StoreResponse {
  address: string;
  delivery: true;
  delivery_price: number;
  description: string;
  id: number;
  image_urls: string[];
  is_deleted: false;
  menu_categories: MenuCategoriesModel[];
  name: string;
  open: StoreOpen[];
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
  shop_categories: ShopCategoriesModel[];
}

export interface StoreDetailForm extends StoreResponse {
  category_ids: number[];
}

export interface StoreTableHead {
  category_names: string[];
  id: number;
  is_deleted: boolean;
  name: string;
  phone: number;
}

export interface StoreTransformHead {
  category_names: string;
  id: number;
  is_deleted: boolean;
  name: string;
  phone: number;
}

export interface StoresResponse {
  current_count: number;
  current_page: number;
  shops: StoreTableHead[],
  total_count: number;
  total_page: number;
}

export interface StoreTransformResponse {
  current_count: number;
  current_page: number;
  shops: StoreTransformHead[],
  total_count: number;
  total_page: number;
}

export interface StoreParams {
  page: number;
  is_deleted: boolean;
}

export interface CreateStoreParams {
  address: string;
  category_ids: number[];
  delivery: true;
  delivery_price: number;
  description: string;
  image_urls: string[];
  name: string;
  open: StoreOpen[];
  pay_bank: boolean;
  pay_card: boolean;
  phone: string;
}

export interface ModifyStoreParams extends CreateStoreParams {
  phone: string;
  bank: string;
  account_number: string;
}
