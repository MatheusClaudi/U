import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public confirmEmailForm: FormGroup;
 
  constructor(private router: Router, private authService: AuthService) {

    this.confirmEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  onSubmit(): void {
    const email = this.confirmEmailForm.get("email").value;
    this.authService.sendResetPasswordEmail(email).subscribe(() => {
      console.log("sended")
    })
    alert("Email enviado")
    this.redirectTo('/login');
  }
    
  hasError(field: string, error: string): boolean {
    const ctrl = this.confirmEmailForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  isFormFieldInvalid(field: string): boolean {
    const ctrl = this.confirmEmailForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

}
