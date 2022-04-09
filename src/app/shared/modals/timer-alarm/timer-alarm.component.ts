import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlarm } from '../../../models/building.model';
import { BuildingService } from '../../../services/building.service';

@Component({
  selector: 'app-timer-alarm',
  templateUrl: './timer-alarm.component.html',
  styleUrls: ['./timer-alarm.component.scss'],
})
export class TimerAlarmComponent implements OnInit {
  totalApartments = this.buildingService.totalApartments;

  form = this.fb.group({
    flatNumber: [null, Validators.required],
    timer: [null, Validators.required],
    type: ['fire', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private buildingService: BuildingService,
    private dialogRef: MatDialogRef<TimerAlarmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close(args?: IAlarm): void {
    this.dialogRef.close(args);
  }
}
