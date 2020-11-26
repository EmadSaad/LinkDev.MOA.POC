import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate, CanActivateChild {


  constructor(public tokenService: TokenService, public router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const token = this.tokenService.getUserToken()
    var TokenIsExpire = this.tokenService.CheckIfTokenExpire(localStorage.TokenExpiration);
    if (token == undefined || TokenIsExpire) {
      this.router.navigate(['auth', 'login'], { queryParams: { returnURL: state.url } });
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.canActivate(childRoute, state);
  }
 
}
