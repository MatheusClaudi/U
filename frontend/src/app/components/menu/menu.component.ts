import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { EventService } from 'src/app/services/events-service';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  public currentLabel: string;
  public hasAction: boolean;
  public loged: boolean;
  public isAdmin: boolean;
  public isClient: boolean;

  constructor(private router: Router, private tokenService: TokenService) {
    router.events.subscribe((ev) => {
      this.updateHeaderAction(router.url);
    });

    EventService.newAdminVerificaton.subscribe((data) => {
      this.isAdmin = data;
    });

    EventService.newClientVerificaton.subscribe((data) => {
      this.isClient = data;
    });

    this.hasAction = true;
    this.loged = false;
  }

  ngOnInit(): void {}

  goToProfile() {
    this.router.navigate(['/user-account']);
  }

  goToUsers() {
    this.router.navigate(['/users']);
  }

  goToPlanning() {
    this.router.navigate(['/planningHome']);
  }

  goToDashBoard() {
    this.router.navigate(['/dashboard']);
  }

  goToLabels() {
    this.router.navigate(['/labels']);
  }

  goToRegister() {
    this.router.navigate(['/sign-up']);
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }

  handleAction() {
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }

  updateHeaderAction(currentPath: string) {
    if (this.tokenService.getToken()) {
      this.currentLabel = 'Sair';
      this.loged = true;
    } else if (currentPath == '/login' || currentPath == '/sign-up') {
      this.currentLabel = 'Entrar';
      this.hasAction = true;
      this.loged = false;
    } else {
      this.currentLabel = 'Entrar';
      this.loged = false;
    }
  }
}
