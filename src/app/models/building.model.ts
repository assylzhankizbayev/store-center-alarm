export interface IAlarm {
  flatNumber: number;
  timer?: number;
  type?: string;
}

export enum TimerAlarmType {
  Electricity = 'electricity',
  Fire = 'fire',
}
