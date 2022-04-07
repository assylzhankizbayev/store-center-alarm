import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() height = 200;
  @Input() width = 200;
  @Input() widthRatio = 1;
  @Input() heightRatio = 1;
  @Input() borderWidth = 5;
  @Input() enabledClick = false;

  constructor() { }

  ngOnInit(): void {
  }

}
