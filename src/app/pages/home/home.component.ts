import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from 'src/app/services/building.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
  ) { }

  ngOnInit(): void {
  }

  openSide(floorNumber: number) {
    console.log('click');

    this.router.navigate(['/top', floorNumber]);
  }

}
