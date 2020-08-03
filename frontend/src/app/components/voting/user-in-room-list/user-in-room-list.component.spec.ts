import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInRoomListComponent } from './user-in-room-list.component';

describe('UserInRoomListComponent', () => {
  let component: UserInRoomListComponent;
  let fixture: ComponentFixture<UserInRoomListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInRoomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
