import { Injectable } from '@angular/core';
import { BehaviorSubject, of, timer } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
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
    return this.alarm$.asObservable().pipe(
      // filter((res) => !!res),
      mergeMap((res) => {
        // console.log('------------', res);
        return !!res
          ? this.alarmCalled.pipe(
              switchMap((isCalled) => {
                return isCalled
                  ? of(res)
                  : of(res).pipe(
                      switchMap((ress) => {
                        // console.log(ress);
                        return timer(0, 1000).pipe(
                          filter(
                            (time) =>
                              (ress?.timer ? ress?.timer - time : 0) >= 0
                          ),
                          map((time) => {
                            const timer = ress?.timer ? ress?.timer - time : 0;
                            return { ...ress, timer };
                          }),
                          tap((res) => {
                            if (!res.timer) {
                              this.alarmCalled$.next(true);
                            }
                          })
                        );
                      })
                    );
              })
            )
          : of(null);
      })
    );
  }

  get alarmCalled() {
    return this.alarmCalled$.asObservable();
  }

  resetAlarm() {
    console.log('reset');

    this.alarm$.next(null);
    this.alarmCalled$.next(false);
  }

  setAlarm(data: IAlarm) {
    this.alarm$.next(data);
  }
}
