import { Component, OnDestroy } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';
import { interval } from 'rxjs';
import { EventService } from './services/events-service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EventService]
})
export class AppComponent implements OnDestroy {

  public isLogged: boolean = false;
  public isAdmin: boolean = false;
  public isClient: boolean = false;


  myVar
  myVar2
  myVar3

  constructor(private router:Router, public tokenService: TokenService, public _us:UserService, public _es: EventService){
    router.events.subscribe(() => {      
      this.isLogged = !!tokenService.getToken();
    })

    this.refresh3()
    this.refresh2()
    this.refresh()

    this.myVar3 = interval(2000)
    .subscribe((val) => { this.refresh3() });
    
    this.myVar2 = interval(2000)
    .subscribe((val) => { this.refresh2() });

    this.myVar = interval(2000)
    .subscribe((val) => { this.refresh() });
  
  } 

  refresh(){
    this._us.isUserAdmin().subscribe(
      admin => {
        this.isAdmin = admin;
        this._es.adminVerification(admin);
      }
      , (err) => { this.myVar.unsubscribe();}
    )
  }

  refresh2(){
    this._us.checkValidUser().subscribe(
      data => {
        if (!data) {
          this.tokenService.logOut()
        }

        this.isLogged = data;
      }
      , (err) => { 
        this.isLogged = false;
        this.myVar2.unsubscribe();}
    )

  }

  refresh3(){
    this._us.isUserClient().subscribe(
      data => {
        this.isClient = data;
        this._es.clientVerification(data);
      }
      , (err) => { this.myVar3.unsubscribe();}
    )
  }

  ngOnDestroy(){
    this.myVar.unsubscribe()
    this.myVar2.unsubscribe()
    this.myVar3.unsubscribe()
  }

}
