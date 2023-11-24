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
