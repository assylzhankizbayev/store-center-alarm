import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../services/building.service';

@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  styleUrls: ['./top-view.component.scss']
})
export class TopViewComponent implements OnInit {
  blocks = this.buildingService.blocks;

  constructor(
    private buildingService: BuildingService
  ) { }

  ngOnInit(): void {
  }

}
