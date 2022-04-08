import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApartment, TimerAlarmType } from '../../models/building.model';
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

  getRate(flatNumber: number): number {
    const aparment = this.buildingService.apartmentList?.find((apartment) => {
      return apartment.flatNumber === flatNumber;
    });

    return aparment ? aparment.rate : 0;
  }

  getFloorRate(): number {
    const start =
      (this.floorNumber - 1) * this.rowsCount * this.apartmentsInRow + 1;
    const end = this.floorNumber * this.rowsCount * this.apartmentsInRow;
    const totalRateOfFloor = this.buildingService.apartmentList
      ?.filter(
        (aparment) => aparment.flatNumber >= start && aparment.flatNumber <= end
      )
      ?.reduce((sum, aparment) => sum + aparment.rate, 0);

    return totalRateOfFloor || 0;
  }
}
