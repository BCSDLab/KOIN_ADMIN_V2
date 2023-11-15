export interface StoreMenusParams {
  id: number;
}

interface OptionPrice {
  option: string;
  price: number;
}

interface Menu {
  description: string;
  id: number;
  image_urls: string[];
  is_hidden: boolean;
  is_single: boolean;
  name: string;
  option_prices: OptionPrice[];
  single_price: number;
}

interface MenuCategory {
  id: number;
  menus: Menu[];
  name: string;
}

export interface MenusResponse {
  count: number;
  menu_categories: MenuCategory[];
}
