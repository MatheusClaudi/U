import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { EmailValidator } from './../../utils/email-validator';
import { EventService } from 'src/app/services/events-service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  addUserForm: FormGroup;
  edit: boolean = false;
  userEmail: String;
  userEdit: any;
  admin: boolean = false;
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

      this.addUserForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phone: new FormControl('', [Validators.minLength(11), Validators.pattern('[0-9 )(+-]{1,}')]),
        pass: new FormControl('', [Validators.required, Validators.minLength(2)]),
        confirmPass: new FormControl('', [Validators.required, Validators.minLength(2)])
      });

      if (!this.edit) {
        this.addUserForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], emailValidator.validate.bind(emailValidator)));
      }
      else {
        this.addUserForm.addControl('email', new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")], emailValidator.validate_change_user_email(this.userEdit.email)))
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
      this.userEdit = history.state.data;

      setTimeout(() => {
        console.log("dsd")
        this.addUserForm.controls.name.setValue(this.userEdit.firstName);
        this.addUserForm.controls.lastName.setValue(this.userEdit.lastName);
        this.addUserForm.controls.email.setValue(this.userEdit.email);
        this.admin = this.userEdit.roles.includes("ADMIN");
      }, 500);
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
    console.log("EDIT");

    const user = new User();
    user.firstName = this.addUserForm.get('name').value;
    user.lastName = this.addUserForm.get('lastName').value;
    // TODO: Adicionar campo para login do user.
    user.email = this.addUserForm.get('email').value;
    user.password = this.addUserForm.get('pass').value;
    // TODO: Adicionar campo para telefone do user.

    /*
    TODO: Função no backend para edição
    this.userService.updateUserInfo(user).subscribe(data => {
      console.log(data);

      if (!this.admin && this.userEdit.roles.includes("ADMIN")){
        this.userService.retrieveUserAdmin(data.id).subscribe()
      }
      else if (this.admin && !this.userEdit.roles.includes("ADMIN")){
        this.userService.giveUserAdmin(data.id).subscribe()
      }

      this.router.navigate(["/users"]);
    });
    */
  }
}
