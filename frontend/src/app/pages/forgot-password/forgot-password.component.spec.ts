import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { throwError } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: AuthService;
  const router = { navigate: jasmine.createSpy('navigate')};
  const formBuilder: FormBuilder = new FormBuilder();  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder},
        { provide: Router, useValue: router },
      ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);

    router.navigate.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () =>{
    expect(component.confirmEmailForm.get('email').value).toEqual('');
  });

  // it('should redirect to login when email was send', () => {
  //   spyOn(authService, 'sendResetPasswordEmail');
  //   component.confirmEmailForm.setValue({ email: 'email'});
  //   component.onSubmit();

  //   expect(router.navigate).toHaveBeenCalledWith(['/login'])
  // })

});
