import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginSucessful: boolean;
 
  constructor(private router: Router, private authService:AuthService, private tokenService: TokenService ) {

    this.loginSucessful = true;

    if (this.tokenService.getToken()){
      this.router.navigate(["/home"]);
    }

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
      });   
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    let email = this.loginForm.get("email").value;
    let password = this.loginForm.get("password").value;
    let credentials = { email: email, password: password }

    this.authService.login(credentials).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveEmail(email);
        console.log(data.token)
        window.location.reload();
      },

      err => {
        console.log("Falha no login");
        this.loginSucessful = false;
      }
    )
  }

  isFormFieldInvalid(field: string): boolean {
    const ctrl = this.loginForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.loginForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }
}

