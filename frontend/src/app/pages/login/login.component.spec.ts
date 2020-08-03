import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  const router = { navigate: jasmine.createSpy('navigate')};
  const formBuilder: FormBuilder = new FormBuilder();  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: FormBuilder, useValue: formBuilder},
        { provide: Router, useValue: router },
      ],
      imports: [ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);

    router.navigate.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty fields', () =>{
    expect(component.loginForm.get('email').value).toEqual('');
    expect(component.loginForm.get('password').value).toEqual('');
  });

  // it('should redirect to dashboard when credentials are correct', () => {
  //   spyOn(authService, 'login').and.returnValue(of({ status: 200 }));
  //   component.loginForm.setValue({ email: 'email', password: 'password'});
  //   component.onSubmit();

  //   expect(component.loginSucessful).toBe(true);
  //   expect(router.navigate).toHaveBeenCalledWith(['/dashboard'])
  // })

  // it('not should redirect to dashboard when credentials are invalid', () => {
  //   spyOn(authService, 'login').and.returnValue(throwError({ status: 400, error: {} }));
  //   component.loginForm.setValue({ email: 'email', password: 'invalidPassword'});
  //   component.onSubmit();

  //   expect(component.loginSucessful).toBe(false);
  //   expect(router.navigate).not.toHaveBeenCalledWith(['/dashboard'])
  // })


});
