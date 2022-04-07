import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() height = 170;
  @Input() width = 170;
  @Input() widthRatio = 1;
  @Input() heightRatio = 1;
  @Input() borderWidth = 5;
  @Input() enabledClick = false;
  @Input() flatNumber = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
