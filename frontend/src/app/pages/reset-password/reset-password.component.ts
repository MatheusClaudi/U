import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public valid: boolean;
  public success: boolean;
  public passwordForm: FormGroup;
  public token: string;



  constructor(private route: ActivatedRoute, private router: Router, private authService:AuthService) {
     this.route.queryParams.subscribe(params => {
           let token = params['token'];

           if (token){
             this.token = token;
             this.authService.validateResetPasswordToken(token).subscribe(
               valid => {
                 this.valid = valid;
               }
             )
           }
           else{
             this.valid = false;
           }     
       }
     );

    this.valid = true;

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required])
      }
    );
    
  }

  ngOnInit(): void {
  }

  isFormFieldInvalid(field: string) {
    const ctrl = this.passwordForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

  hasError(field: string, error: string) {
    const ctrl = this.passwordForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  passwordsMatch(): boolean{
    let pass1 = this.passwordForm.get("password").value;
    let pass2 = this.passwordForm.get("passwordConfirm").value;

    return pass1 == pass2;
  }

  redirectoTo(path: string) {
    this.router.navigate([path]);
  }

  onSubmit(){
    let pass1 = this.passwordForm.get("password").value;
    this.authService.resetPassword(this.token, pass1).subscribe(
      res => {
      }  
    )
    alert("Senha modificada, com sucesso!!")
    this.redirectoTo('/login')
  }


}
