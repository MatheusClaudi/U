import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';


@Injectable({ providedIn: 'root' })
export class DevGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenService: TokenService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let loged = !!this.tokenService.getDevRoom() && !!this.tokenService.getDevName();

        if (loged) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/home/developerEntry'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
