import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          //console.log(route.url);
        if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser') != 'undefined') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }

     canActivates(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
          //console.log(route.url);
        if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser') != 'undefined') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}