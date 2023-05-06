import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authUser: UsersService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const user = localStorage.getItem('rol');

        if (user) {
            if (route.data.roles && route.data.roles.indexOf(user) === -1) {
                this.router.navigate(['/'])
                return false;
            }
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnURL: state } })
        return false;

    }
}