import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss'],
})
export class TopViewComponent implements OnInit {
  blocks = this.buildingService.blocks;
  rows = this.buildingService.rows;

  constructor(
    private router: Router,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {}

  back() {
    this.router.navigate(['/home']);
  }
}
