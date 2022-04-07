import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  @Input() height = 50;

  constructor() { }

  ngOnInit(): void {
  }

}
