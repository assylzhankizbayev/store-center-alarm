import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss'],
})
export class TopViewComponent implements OnInit {
  blocks = this.buildingService.blocks;
  rows = this.buildingService.rows;
  floorNumber: number | null = null;

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

  back() {
    this.router.navigate(['/home']);
  }
}
