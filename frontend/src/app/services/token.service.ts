import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY: string;
  private USER_EMAIL_KEY: string;
  private DEV_NAME_KEY: string;
  private DEV_ROOM_KEY: string;


  constructor(private router: Router) { 
    this.TOKEN_KEY = 'token';
    this.USER_EMAIL_KEY = 'userEmail';
    this.DEV_NAME_KEY = 'devName';
    this.DEV_ROOM_KEY = 'devRoomKey';
  }

  logOut(): void {
    this.removeDevName()
    this.removeToken()
    this.router.navigate(['/login']);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  public removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public saveEmail(email: string): void {
    window.sessionStorage.removeItem(this.USER_EMAIL_KEY);
    window.sessionStorage.setItem(this.USER_EMAIL_KEY, email);
  }

  public getEmail(): string {
    return sessionStorage.getItem(this.USER_EMAIL_KEY);
  }

  public saveDevName(name: string): void {
    window.sessionStorage.removeItem(this.DEV_NAME_KEY);
    window.sessionStorage.setItem(this.DEV_NAME_KEY, name);
  }

  public getDevName(): string {
    return sessionStorage.getItem(this.DEV_NAME_KEY);
  }

  public removeDevName(): void {
    window.sessionStorage.removeItem(this.DEV_NAME_KEY);
  }

  public saveDevRoom(room: string): void{
    window.sessionStorage.removeItem(this.DEV_ROOM_KEY);
    window.sessionStorage.setItem(this.DEV_ROOM_KEY, room);
  }

  public getDevRoom(): string{
    return window.sessionStorage.getItem(this.DEV_ROOM_KEY);
  }

  public removeDevRoom(): void{
    window.sessionStorage.removeItem(this.DEV_ROOM_KEY);
  }

}
