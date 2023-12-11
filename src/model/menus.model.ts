export interface MenusParams {
  id: number;
}

export interface OptionPrice {
  option: string;
  price: number;
}

export interface Menu {
  description: string;
  id: number;
  image_urls: string[];
  is_hidden: boolean;
  is_single: boolean;
  name: string;
  option_prices: OptionPrice[];
  single_price: number;
}

export interface MenuCategory {
  id: number;
  menus: Menu[];
  name: string;
}

// API 응답

export interface MenusResponse {
  count: number;
  menu_categories: MenuCategory[];
}

export interface MenuResponse {
  id: number;
  shop_id: number;
  name: string;
  is_hidden: boolean;
  is_single: boolean;
  single_price: number;
  option_prices: null | OptionPrice[];
  description: null | string;
  category_ids: number[];
  image_urls: string[];
}

// API 요청 (add)
export interface AddMenusArgs {
  id: number;
  body: MenusResponse;
}

// API 요청 (update, delete)

export interface MutationMenuArgs {
  id: number;
  menuId: Menu['id'];
  body?: MenuBody[];
}

// API body
export interface MenuBody {
  category_ids: number[];
  description: string;
  image_urls: string[];
  is_single: boolean;
  name: string;
  option_prices: OptionPrice[];
  single_price: number;
}
