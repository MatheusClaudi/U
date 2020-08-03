import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { EmailValidator } from '../../utils/email-validator';


@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  userForm: FormGroup;

  fileUrl: any;
  email: String;
  userFile: File;
  isPhoto: boolean = true;

  private userEmail: String;

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private authService:AuthService,
    emailValidator: EmailValidator
  ) {
    this.userEmail = this.tokenService.getEmail();
    this.userForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], emailValidator.validate.bind(emailValidator)],
     // password: [null, [Validators.required]]
    });

    this.actualUser();
  }

  ngOnInit(): void {
  }

  actualUser() {
    let user: User;

    this.userService.getUserData(this.userEmail).subscribe(
      data => user = data
    );

    setTimeout(()=>{
      this.userForm.controls.file.setValue("../../../assets/img/coffee.svg");
      this.userForm.controls.firstName.setValue(user.firstName);
      this.userForm.controls.lastName.setValue(user.lastName);
      this.userForm.controls.email.setValue(user.email);

      this.email = user.email;
    }, 200)
  }

  updateUser() {
    this.updateUserInfo()
  }


  updateUserInfo() {

    console.log("lancou")

    let user = new User()
    user.firstName = this.userForm.get("firstName").value;
    user.lastName = this.userForm.get("lastName").value;
    user.email = this.userForm.get("email").value;
    // user.password = this.userForm.get("password").value;

    this.userService.updateUserInfo(user).subscribe(
      data => {
        console.log(data)
      }
    )
  }

  

  deleteUser() {
    this.userService.deleteUser(this.email).subscribe(() => {
      alert("Conta deletada")
      this.tokenService.logOut()
      this.router.navigate(["/login"])
    });
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.userForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  validForm() {
    return this.userForm.valid;
  }

  onFileChange(event): void {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      if (file.type.includes('image')) {
        this.userFile = file;

        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.fileUrl = reader.result;
          this.userForm.patchValue({
            file: reader.result
          });
        }

        if  (file.type.includes('video')) {
          this.isPhoto = false;
        }
        else {
          this.isPhoto = true;
        }

        this.cd.markForCheck();
      } else {
        alert('Arquivo inválido');
      }

    }

  }

}
