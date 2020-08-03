import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { EventService } from 'src/app/services/events-service';


@Injectable({ providedIn: 'root' })
export class UnlogedGuard implements CanActivate {
    constructor(
        private router: Router,
        private _tokenService: TokenService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

        let loged = this._tokenService.getToken();

        if (!loged) {
            return true;
        }

        console.log("sdsdsds")

        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
