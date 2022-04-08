import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAlarm, TimerAlarmType } from '../../models/building.model';
import { BuildingService } from '../../services/building.service';
import { TimerAlarmComponent } from '../modals/timer-alarm/timer-alarm.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  TIMER_ALARM = TimerAlarmType;
  alarm$ = this.buildingService.alarm;
  alarmCalled$ = this.buildingService.alarmCalled;

  constructor(
    private dialog: MatDialog,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {}

  openAlarm(): void {
    const dialogRef = this.dialog.open(TimerAlarmComponent);

    dialogRef.afterClosed().subscribe((result: IAlarm) => {
      if (result?.timer) {
        this.buildingService.setAlarm(result);
      }
    });
  }
}
