import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimerAlarmType } from '../../models/building.model';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss'],
})
export class TopViewComponent implements OnInit {
  TIMER_ALARM = TimerAlarmType;
  alarm$ = this.buildingService.alarm;
  apartments = this.buildingService.apartments;
  apartmentsInRow = this.buildingService.apartmentsInRow;
  rows = this.buildingService.rows;
  rowsCount = this.buildingService.rowsCount;
  floorNumber: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const floorNumber = params.get('floorNumber');
      this.floorNumber = floorNumber ? +floorNumber : 1;
    });
  }

  reset() {
    this.buildingService.resetAlarm();
  }

  back() {
    this.router.navigate(['/home']);
  }
}
