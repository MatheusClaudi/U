import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeRetrospectiveComponent } from './qrcode-retrospective.component';

describe('QrcodeRetrospectiveComponent', () => {
  let component: QrcodeRetrospectiveComponent;
  let fixture: ComponentFixture<QrcodeRetrospectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrcodeRetrospectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrcodeRetrospectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
