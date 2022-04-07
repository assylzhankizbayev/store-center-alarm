import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  private floorsCount = 3;
  private rowsCount = 2;
  private blocksInRow = 4;

  constructor() { }

  get floors() {
    return Array(this.floorsCount);
  }

  get blocks() {
    return Array(this.blocksInRow);
  }

  get rows() {
    return Array(this.rowsCount);
  }
}
