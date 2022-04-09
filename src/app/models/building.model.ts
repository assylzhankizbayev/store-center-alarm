export interface IShopList {
  success: boolean;
  result: IShop[];
}

export interface IShopByNumber {
  success: boolean;
  result: IShop;
}

export interface IShop {
  id?: number;
  number: string;
  owner?: string;
  square?: number;
  electricityUsage: number;
}

export interface ISuccess {
  success: boolean;
}
