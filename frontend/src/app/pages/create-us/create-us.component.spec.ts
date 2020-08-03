import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsComponent } from './create-us.component';

describe('CreateUsComponent', () => {
  let component: CreateUsComponent;
  let fixture: ComponentFixture<CreateUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
