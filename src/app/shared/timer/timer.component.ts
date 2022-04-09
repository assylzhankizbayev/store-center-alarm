import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { AlarmService } from 'src/app/services/alarm.service';
import { IAlarm, TimerAlarmType } from '../../models/alarm.model';
import { TimerAlarmComponent } from '../modals/timer-alarm/timer-alarm.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  TIMER_ALARM = TimerAlarmType;
  alarm$ = this.alarmService.alarm;
  alarmCalled$ = this.alarmService.alarmCalled;
  destroy$ = new Subject();

  constructor(private dialog: MatDialog, private alarmService: AlarmService) {}

  ngOnInit(): void {}

  openAlarm(): void {
    const dialogRef = this.dialog.open(TimerAlarmComponent);

    dialogRef
      .afterClosed()
      .pipe(
        mergeMap((result: IAlarm) => {
          return result?.timer
            ? this.alarmService.addAlarm(result).pipe(
                tap(() => {
                  this.alarmService.setAlarm(result);
                })
              )
            : of(null);
        }),
        take(1)
      )
      .subscribe();
  }
}
