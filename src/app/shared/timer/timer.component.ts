import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { of, timer } from 'rxjs';
import { mergeMap, tap, map, filter } from 'rxjs/operators';
import { IAlarm, TimerAlarmType } from '../../models/building.model';
import { BuildingService } from '../../services/building.service';
import { TimerAlarmComponent } from '../modals/timer-alarm/timer-alarm.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  fireAlarm$ = this.buildingService.fireAlarm.pipe(
    filter(res => !!res),
    mergeMap((res) =>
      timer(0, 1000).pipe(
        filter(time => (res?.timer ? res?.timer - time : 0) >= 0),
        map((time) => {
          const timer = res?.timer ? res?.timer - time : 0;
          return { ...res, timer };
        }),
      )
    )
  );
  electricAlarm$ = this.buildingService.electricAlarm;

  constructor(
    private dialog: MatDialog,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {}

  openAlarm(): void {
    const dialogRef = this.dialog.open(TimerAlarmComponent);

    dialogRef.afterClosed().subscribe((result: IAlarm) => {
      if (result?.timer && result?.type === TimerAlarmType.Electricity) {
        this.buildingService.setElectricAlarm(result.timer, result.flatNumber);
      } else if (result?.timer && result.type === TimerAlarmType.Fire) {
        this.buildingService.setFireAlarm(result.timer, result.flatNumber);
      }
    });
  }
}
