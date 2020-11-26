import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../shared/services/token.service';


@Injectable({
  providedIn: 'root'
})

export class ProfileGuardService implements CanActivate {


  constructor(public tokenService: TokenService, public router: Router) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    debugger;
    const token = this.tokenService.getUserToken()
    if (token == undefined) {
      return true;
    }
    else {
      this.router.navigate(['auth', 'NotAuthorizedPage']);
    }
    return false;
  }

 
}
