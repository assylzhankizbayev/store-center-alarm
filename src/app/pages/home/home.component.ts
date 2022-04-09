import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
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

  getFloorRate$ = this.buildingService.shopList.pipe(
    filter((shop) => shop?.length > 0),
    map((shop) => shop.reduce((sum, shop) => sum + shop.electricityUsage, 0))
  );
}
