import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css'],
})
export class SelectUserComponent implements OnInit {
  @Input() selected: Array<any>;
  ShowFilter = true;
  constructor(private userService: UserService) {}

  public users: Array<User> = [];
  public response: Array<User> = [];
  dropdownSettings = {};
  ngOnInit() {
    this.userService.findAll().subscribe((users) => {
      users.forEach((user) => {
        this.users.push(user);
      });
      this.users = this.response;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'firstName',
      selectAllText: 'Selecionar todos',
      unSelectAllText: 'Deselecionar todos',
      allowSearchFilter: this.ShowFilter,
      searchPlaceholderText: 'Pesquisar',
      noDataAvailablePlaceholderText: 'Sem usuários cadastrados',
    };
  }
  getUser(item: User) {
    console.log('onItemSelect', item);
  }
}
