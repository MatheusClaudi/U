import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DevService {

  private DEV_ID_KEY: string;


  constructor(private router: Router) { 
    this.DEV_ID_KEY = 'devId';
  }

  public saveDevId(devId){
      window.sessionStorage.removeItem(this.DEV_ID_KEY);
      window.sessionStorage.setItem(this.DEV_ID_KEY, devId);
  }

  public getDevId(): string{
    return window.sessionStorage.getItem(this.DEV_ID_KEY);
  }

  public removeDevId(): void{
    window.sessionStorage.removeItem(this.DEV_ID_KEY);
  }
  
}
