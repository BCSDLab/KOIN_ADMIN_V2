export interface MenusParams {
  id: number;
}

export interface OptionPrice {
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

export interface MenuCategory {
  id: number;
  menus: Menu[];
  name: string;
}

export interface MenusResponse {
  count: number;
  menu_categories: MenuCategory[];
}

// 형식 변환
export interface WholeMenuData {
  id: number;
  menus: MenusData[];
  name: string;
}

interface MenusData {
  description?: string;
  id: number;
  image_urls: string[];
  ishidden: boolean;
  isSingle: boolean;
  name: string;
  option_prices?: OptionPrice[];
  single_price?: number;
}
