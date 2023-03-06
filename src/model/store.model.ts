export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface MenuCatefotiesModel {
  'id': number;
  'name': string;
}

export interface OpenModel {
  'close_time': string;
  'closed': boolean;
  'day_of_week': DayOfWeek;
  'open_time': string;
}

export interface ShopCategoriesModel {
  'id': number;
  'name': string;
}

export interface StoreResponse {
  'address': string;
  'delivery': true;
  'delivery_price': number;
  'description': string;
  'id': number;
  'image_urls': string[];
  'is_deleted': false;
  'menu_categories': MenuCatefotiesModel[];
  'name': string;
  'open': OpenModel[];
  'pay_bank': boolean;
  'pay_card': boolean;
  'phone': string;
  'shop_categories': ShopCategoriesModel[];
}

export interface StoreTableHead {
  'category_names': string[];
  'id': number;
  'is_deleted': boolean;
  'name': string;
  'phone': number;
}

export interface StoresResponse {
  'current_count': number;
  'current_page': number;
  'shops': StoreTableHead[],
  'total_count': number;
  'total_page': number;
}

export interface StoreParams {
  page: number;
  is_deleted: boolean;
}