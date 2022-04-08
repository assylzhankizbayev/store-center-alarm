import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { IAlarm } from '../models/building.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  floorsCount = 3;
  rowsCount = 2;
  apartmentsInRow = 4;
  apartmentsSquare = 40;
  private alarm$ = new BehaviorSubject<IAlarm | null>(null);
  private alarmCalled$ = new BehaviorSubject<boolean>(false);

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

  get totalApartments() {
    return Array(this.rowsCount * this.floorsCount * this.apartmentsInRow);
  }

  get alarm() {
    return this.alarmCalled.pipe(
      mergeMap(isCalled => isCalled ? of(null) : this.alarm$.asObservable()),
      // filter((res) => {
      //   console.log(!!res, res)
      //   return !!res
      // }),
      mergeMap((res) =>
        timer(0, 1000).pipe(
          filter((time) => (res?.timer ? res?.timer - time : 0) >= 0),
          map((time) => {
            const timer = res?.timer ? res?.timer - time : 0;
            console.log(timer);
            return { ...res, timer };
          }),
          tap((res) => {
            if (res) {
              this.alarmCalled$.next(true);
            }
          })
        )
      )
    );
  }

  get alarmCalled() {
    return this.alarmCalled$.asObservable();
  }

  setAlarm(data: IAlarm) {
    this.alarm$.next(data);
  }
}
