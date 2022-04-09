import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IAlarm, IAlarmList } from '../models/alarm.model';

@Injectable({
  providedIn: 'root',
})
export class AlarmService {
  url = environment.host;
  private alarm$ = new BehaviorSubject<IAlarm | null>(null);
  private alarmCalled$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllAlarms(): Observable<IAlarmList> {
    return this.http.get<IAlarmList>(this.url + '/alarm');
  }

  addAlarm(data: IAlarm): Observable<IAlarmList> {
    return this.http.post<IAlarmList>(this.url + '/alarm', data);
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
                              console.log('time called');

                              this.alarmCalled$.next(true);
                              // return this.adddAlarm(res);
                            }
                            // return of(null);
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
