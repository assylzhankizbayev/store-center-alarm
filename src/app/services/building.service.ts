import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlarm } from '../models/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  floorsCount = 3;
  rowsCount = 2;
  apartmentsInRow = 4;
  apartmentsSquare = 40;
  private fireAlarm$ = new BehaviorSubject<IAlarm | null>(null);
  private electricAlarm$ = new BehaviorSubject<any>(null);

  constructor() {}

  get floors() {
    return Array(this.floorsCount);
  }

  get apartments() {
    return Array(this.apartmentsInRow);
  }

  get rows() {
    return Array(this.rowsCount);
  }

  get fireAlarm() {
    return this.fireAlarm$.asObservable();
  }

  get electricAlarm() {
    return this.electricAlarm$.asObservable();
  }

  setFireAlarm(timer: number, flatNumber: number) {
    this.fireAlarm$.next({ timer, flatNumber });
  }

  setElectricAlarm(timer: number, flatNumber: number) {
    this.electricAlarm$.next({ timer, flatNumber });
  }
}
