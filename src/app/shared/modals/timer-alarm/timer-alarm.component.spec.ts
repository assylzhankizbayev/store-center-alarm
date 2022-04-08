import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerAlarmComponent } from './timer-alarm.component';

describe('TimerAlarmComponent', () => {
  let component: TimerAlarmComponent;
  let fixture: ComponentFixture<TimerAlarmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerAlarmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerAlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
