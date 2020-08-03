import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { EmailValidator } from '../../utils/email-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registrationForm: FormGroup;
 
  constructor(private router: Router, private userService: UserService, emailValidator: EmailValidator) {

    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], emailValidator.validate.bind(emailValidator)),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
      
  }

  ngOnInit(){}

 
  redirectToLogin(): void {
    this.router.navigate(['/login']);
  }

  isFormFieldInvalid(field: string): boolean {
    const ctrl = this.registrationForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.registrationForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  register(): void {
    let user = new User()
    user.firstName = this.registrationForm.get("name").value;
    user.lastName = this.registrationForm.get("lastname").value;
    user.email = this.registrationForm.get("email").value;
    user.password = this.registrationForm.get("password").value;
    
    this.userService.saveAdmin(user).subscribe(() => {
    });

    alert("Cadastro efetuado.")

    this.redirectToLogin()
   }
}
