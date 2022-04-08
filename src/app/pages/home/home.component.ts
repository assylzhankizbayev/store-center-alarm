import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  floors = this.buildingService.floors;
  floorsCount = this.buildingService.floorsCount;
  apartments = this.buildingService.apartments;
  apartmentsInRow = this.buildingService.apartmentsInRow;
  rows = this.buildingService.rows;
  rowsCount = this.buildingService.rowsCount;
  apartmentsSquare = this.buildingService.apartmentsSquare;

  constructor(
    private router: Router,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {}

  openSide(floorNumber: number) {
    this.router.navigate(['/top', floorNumber]);
  }

  getFloorRate(): number {
    const totalRate = this.buildingService.apartmentList?.reduce(
      (sum, aparment) => sum + aparment.rate,
      0
    );

    return totalRate || 0;
  }
}
