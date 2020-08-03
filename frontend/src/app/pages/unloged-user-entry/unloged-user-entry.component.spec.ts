import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlogedUserEntryComponent } from './unloged-user-entry.component';

describe('UnlogedUserEntryComponent', () => {
  let component: UnlogedUserEntryComponent;
  let fixture: ComponentFixture<UnlogedUserEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlogedUserEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlogedUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
