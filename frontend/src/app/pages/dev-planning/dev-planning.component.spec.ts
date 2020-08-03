import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevPlanningComponent } from './dev-planning.component';

describe('DevPlanningComponent', () => {
  let component: DevPlanningComponent;
  let fixture: ComponentFixture<DevPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
