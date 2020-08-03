import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { interval } from 'rxjs';
import { EventService } from 'src/app/services/events-service';

@Component({
  selector: 'user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
})
export class UserNavComponent implements OnInit, OnDestroy {
  public activeRoute: string;
  public currentUser: User;
  public username: string;
  public isAdmin: boolean;
  public isClient: boolean;
  myVar

  constructor(private router: Router, private userService: UserService) {
    
    this.myVar = interval(2000)
    .subscribe((val) => { this.refresh() });

    EventService.newAdminVerificaton.subscribe(
      data => {
        this.isAdmin = data; 
        
      }

    )
    EventService.newClientVerificaton.subscribe(
      data => {
        this.isClient = data; 
        
      }

    )
  }

  refresh() {
    this.userService.getUserData("sss").subscribe(
      data => {
        this.currentUser = data
      }
    )
  }

  ngOnDestroy(){
    this.myVar.unsubscribe();
  }

  ngOnInit(): void {}
}
