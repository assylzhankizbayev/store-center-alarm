export interface IAlarm {
  flatNumber: number;
  timer: number;
  type: string;
  time?: string;
}

export enum TimerAlarmType {
  Electricity = 'electricity',
  Fire = 'fire',
}

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
