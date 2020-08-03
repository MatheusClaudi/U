import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { EventService } from 'src/app/services/events-service';


@Injectable({ providedIn: 'root' })
export class ClientGuard implements CanActivate {
    constructor(
        private router: Router,
        private _us: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        
        if(EventService.client){
            return true;
        }

        if(EventService.client == undefined){
            return true;
        }

        console.log("ssa")
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
