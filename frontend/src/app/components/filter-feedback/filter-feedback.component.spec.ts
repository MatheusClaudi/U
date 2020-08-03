import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFeedbackComponent } from './filter-feedback.component';

describe('FilterFeedbackComponent', () => {
  let component: FilterFeedbackComponent;
  let fixture: ComponentFixture<FilterFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
