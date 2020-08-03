import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Component, OnInit, Injectable, Output, Input, OnChanges } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { KeyedRead } from '@angular/compiler';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.css']
})
export class UserSelectComponent implements OnInit {

  public form: FormGroup;

  public mapUsers;

  public Users;

  public keywords: String = "";

  public showSelected = true;

  @Input() startSelectUsers: Array<User>;
  @Output() usersHaveBeenChanged = new EventEmitter();

  constructor(private fb: FormBuilder, private _us: UserService) {
    this.form = this.fb.group({
      checkArray: this.fb.array([])
    })

    this.findUsers("");
    this.mapUsers = new Map();
  }

  ngOnInit(): void {
    if(this.startSelectUsers){
      const checkArray: FormArray = this.form.get('checkArray') as FormArray;
      for (let user of this.startSelectUsers){
        this.mapUsers.set(user.id, user);
        checkArray.push(new FormControl(user.id));
        console.log("fdsds-------")
        console.log(this.mapUsers)
      }
    }
  }

  findUsers(keyword: String){
    if(keyword == ""){
      this._us.findAll().subscribe(
        data => {
          this.Users = data;
        }
      )
    }
    else{
      this._us.findAllByKeyword(keyword).subscribe(
        data => {
          this.Users = data;
        }
      )
    }  
  }


  onCheckboxChange(e, usr: User) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(usr.id));
      this.mapUsers.set(usr.id, usr);
      this.usersHaveBeenChanged.emit(this.emitValue(this.mapUsers, usr));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == usr.id) {
          checkArray.removeAt(i);
          this.mapUsers.delete(usr.id);
          this.usersHaveBeenChanged.emit(this.emitValue(this.mapUsers, usr));
          return;
        }
        i++;
      });
    }
  }

  emitValue(map, change){
    return { map: map, change: change}
  }

  checkCheckedValid(usr: User){
    return this.mapUsers.has(usr.id);
  }

  showHideSelected(){
    this.showSelected = !this.showSelected;
  }

  unselectAll(){
    this.mapUsers = new Map();
  }

  selectAll(){
    this.Users.forEach((usr) => {
      if(!this.mapUsers.has(usr.id) && usr.firstName != 'admin'){
        this.mapUsers.set(usr.id, usr);
      }
  });
  }

  do(){
    this.findUsers(this.keywords);
  }

}
// Dados de usuários para teste das buscas no frontend
export const FAKE_USERS: User[] = [
  {
    id: '1111',
    firstName: 'Lyang',
    lastName: 'Medeiros',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '2222',
    firstName: 'Almir',
    lastName: 'Gonçalves',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '333',
    firstName: 'Matheus',
    lastName: 'Macêdo',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '444',
    firstName: 'Lucas',
    lastName: 'Costa',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '5555',
    firstName: 'Bruna',
    lastName: 'Justino',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '6666',
    firstName: 'Wislayne',
    lastName: 'Silva',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '7777',
    firstName: 'Antonio',
    lastName: 'da Silva',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '8888',
    firstName: 'Chad',
    lastName: 'Smith',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '99999',
    firstName: 'John',
    lastName: 'Frusciante',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
  {
    id: '3333',
    firstName: 'John',
    lastName: 'Doe',
    email: 'nome.nome@embedded.ufcg.edu.br',
    password: 'senha',
    showDetails: false,
  },
];
