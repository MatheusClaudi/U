import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { of, Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/User';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService; 
  const router = { navigate: jasmine.createSpy('navigate')};
  const formBuilder: FormBuilder = new FormBuilder(); 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder},
        { provide: Router, useValue: router },
      ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);

    router.navigate.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () =>{
    expect(component.registrationForm.get('name').value).toEqual('');
    expect(component.registrationForm.get('lastname').value).toEqual('');
    expect(component.registrationForm.get('email').value).toEqual('');
    expect(component.registrationForm.get('password').value).toEqual('');
  });

  // it('should redirect to login when fields are valid', () => {
  //   spyOn(userService, 'save').and.returnValue(new Observable<User>());
  //   component.registrationForm.setValue({ name: 'name', lastname: 'lastname', email: 'email', password: 'password'});
  //   component.register();

  //   expect(router.navigate).toHaveBeenCalledWith(['/login'])
  // })

  // it('not should redirect to login when name field is invalid', () => {
  //   spyOn(userService, 'save').and.returnValue(throwError({ status: 400, error: {} }));
  //   component.registrationForm.setValue({ name: 'invalidName', lastname: 'lastname', email: 'email', password: 'password'});
  //   component.register();

  //   expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
  // })

  // it('not should redirect to login when lastname field is invalid', () => {
  //   spyOn(userService, 'save').and.returnValue(throwError({ status: 400, error: {} }));
  //   component.registrationForm.setValue({ name: 'name', lastname: 'invalidLastname', email: 'email', password: 'password'});
  //   component.register();

  //   expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
  // })

  // it('not should redirect to login when email field is invalid', () => {
  //   spyOn(userService, 'save').and.returnValue(throwError({ status: 400, error: {} }));
  //   component.registrationForm.setValue({ name: 'name', lastname: 'lastname', email: 'invalidEmail', password: 'password'});
  //   component.register();

  //   expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
  // })

  // it('not should redirect to login when password field is invalid', () => {
  //   spyOn(userService, 'save').and.returnValue(throwError({ status: 400, error: {} }));
  //   component.registrationForm.setValue({ name: 'name', lastname: 'lastname', email: 'email', password: 'invalidPassword'});
  //   component.register();

  //   expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
  // })

});
