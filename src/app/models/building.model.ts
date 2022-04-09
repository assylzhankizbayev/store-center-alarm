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

// export interface IApartment {
//   flatNumber: number;
//   rate: number;
// }

export interface IShopList {
  success: true;
  result: IShop[];
}

export interface IShop {
  id?: number;
  number: string;
  owner?: string;
  square?: number;
  electricityUsage: number;
}
