import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { EmailValidator } from './../../utils/email-validator';
import { EventService } from 'src/app/services/events-service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  edit: boolean = false;
  userEmail: String;
  userEdit: any;
  admin: boolean = false;
  adminEdit: boolean = false;
  myVar

  constructor(
    private emailValidator: EmailValidator,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
    )
    {
      this.route.queryParams.subscribe(params => {
        this.edit = (params['edit']=='true');
      });

      this.userEdit = history.state.data;
    

      this.addUserForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]),
        phone: new FormControl('', [Validators.minLength(11), Validators.pattern('[0-9 )(+-]{1,}')]),
      });

      if (!this.edit) {
        this.addUserForm.addControl('pass', new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]))
        this.addUserForm.addControl('confirmPass', new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]))
        this.addUserForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(200)], emailValidator.validate.bind(emailValidator)));
      }
      else {
        this.addUserForm.addControl('pass', new FormControl('', [Validators.minLength(2), Validators.maxLength(200)]))
        this.addUserForm.addControl('confirmPass', new FormControl('', [Validators.minLength(2), Validators.maxLength(200)]))
        this.addUserForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"), Validators.maxLength(200)], emailValidator.validate_change_user_email(this.userEdit.email)))
      }
    }

  ngOnInit(): void {

    this.myVar = EventService.newAdminVerificaton.subscribe(
      data => {
        if (!data){
          this.router.navigate(["/home"]);
        }
      }
    )

    if (this.edit) {

      this.addUserForm.controls.name.setValue(this.userEdit.firstName);

      this.addUserForm.controls.name.setValue(this.userEdit.firstName);
      this.addUserForm.controls.lastName.setValue(this.userEdit.lastName);
      this.addUserForm.controls.email.setValue(this.userEdit.email);
      this.admin = this.userEdit.roles.includes("ADMIN");
      this.adminEdit = !!this.userEdit.roles.includes("ADMIN");
    }
  }

  ngOnDestroy(){
    this.myVar.unsubscribe()
  }

  isFormFieldInvalid(field: string): boolean {
    const ctrl = this.addUserForm.get(field);
    return !ctrl.valid && ctrl.touched && ctrl.dirty;
  }

  hasError(field: string, error: string): boolean {
    const ctrl = this.addUserForm.get(field);
    return ctrl.dirty && ctrl.hasError(error);
  }

  isPasswordDifferent(): boolean{
    const pass = this.addUserForm.get('pass').value;
    const conf = this.addUserForm.get('confirmPass').value;
    return pass !== conf;
  }

  isPasswordDifferent2(): boolean{
    
    if(this.addUserForm.get('pass').dirty || this.addUserForm.get('confirmPass').dirty){
      const pass = this.addUserForm.get('pass').value;
      const conf = this.addUserForm.get('confirmPass').value;
      return pass !== conf;
    }
    else{
      return false;
    }
  }

  returnToUsers() {
    this.router.navigate(["/users"]);
  }

  adminManagement(){
    this.admin = !this.admin;
  }

  register(): void {
    console.log("CREATE");

    const user = new User();
    user.firstName = this.addUserForm.get('name').value;
    user.lastName = this.addUserForm.get('lastName').value;
    // TODO: Adicionar campo para login do user.
    user.email = this.addUserForm.get('email').value;
    user.password = this.addUserForm.get('pass').value;
    // TODO: Adicionar campo para telefone do user.

    if (this.admin){
      this.userService.saveAdmin(user).subscribe(() => {
        this.router.navigate(["/users"]);
      });
    }
    else {
      this.userService.save(user).subscribe(() => {
        this.router.navigate(["/users"]);
      });
    }
  }

  editUser(): void {

    let form = this.addUserForm;


    let a = form.get("name").dirty || form.get("lastName").dirty || form.get("email").dirty;
    let b = form.get("pass").dirty;
    let c = this.admin != this.adminEdit;

    let aReady = !a;
    let bReady = !b;
    let cReady = !c;

    if (a){
      if(form.get("name").value != this.userEdit.firstName || form.get("lastName").value != this.userEdit.lastName || form.get("email").value != this.userEdit.email){
        const user = new User();
        user.firstName = this.addUserForm.get('name').value;
        user.lastName = this.addUserForm.get('lastName').value;
        user.email = this.addUserForm.get('email').value;
        this.userService.updateInfoUserFromSystem(user, this.userEdit.id).subscribe(
          data => {
            aReady = true;
            
            if(aReady && bReady && cReady){
              this.router.navigate(["/users"]);
            }
          }
        );
      }
    }

    if(b){
      this.userService.updateUserPasswordFromSystem(this.addUserForm.get('pass').value, this.userEdit.id).subscribe(
        data => {
          bReady = true;
          if(aReady && bReady && cReady){
            this.router.navigate(["/users"]);
          }
        }
      );
    }

    if(c){
      if (!this.admin){
        this.userService.retrieveUserAdmin(this.userEdit.id).subscribe(
          data => {
            cReady = true;
            if(aReady && bReady && cReady){
              this.router.navigate(["/users"]);
            }
          }
        );
      }
      else{
        this.userService.giveUserAdmin(this.userEdit.id).subscribe(
          data => {
            cReady = true;
            if(aReady && bReady && cReady){
              this.router.navigate(["/users"]);
            }
          }
        );
      }
    }

    if(a && b && c){
      this.router.navigate(["/users"]);
    }

  }
}
