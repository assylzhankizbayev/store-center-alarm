export interface IAlarmList {
  success: boolean;
  result: IAlarm[];
}

export interface IAlarm {
  id?: number;
  number: string;
  type: string;
  time?: string;
  timer?: number;
}

export enum TimerAlarmType {
  Electricity = 'electricity',
  Fire = 'fire',
}
