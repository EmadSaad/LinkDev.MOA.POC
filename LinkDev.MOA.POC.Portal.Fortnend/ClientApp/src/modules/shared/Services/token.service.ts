import { Injectable } from '@angular/core';
import { Observable, observable, pipe, interval } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { IUserData } from '../../auth/models/User';



@Injectable({
  providedIn: 'root'
})
export class TokenService {


  token: string;
  authToken = 'authKey';
  TokenExpiration = 'TokenExpiration';
  UserFullName = 'UserFullName';
  UserName: string;
  userData: IUserData;

  constructor(
    private localStorage: LocalStorageService,
  ) {
  }

  getUserToken(): string {
    //this.token = this.localStorage.get(this.authToken, false);
    this.token = localStorage.authKey;
    return this.token;
  }

  setUserToken(token: string): void {
    this.localStorage.set(this.authToken, token, false);
  }

  setUserTokenExpiration(tokenExpiration: number): void {
    this.localStorage.set(this.TokenExpiration, tokenExpiration, false);
  }

  setUserFullName(FullName: string): void {
    this.localStorage.set(this.UserFullName, FullName, false);
  }

  getUserFullName(): string {
    this.UserName = localStorage.UserFullName;
    //this.UserFullName = this.localStorage.get('UserFullName', false);
    return this.UserName;
  }

  setUserData(userData: IUserData) {
    this.localStorage.set('userData', userData, true);
    this.userData = { ...userData };
  }

  getUserData(): IUserData {
    this.userData = this.localStorage.get('userData', true);
    return this.userData;
  }

  CheckIfTokenExpire(tokenExpiration: number): boolean {
    var today = new Date();
    var expiryDate = new Date(today.getTime() + tokenExpiration * 1000);
    if (today > expiryDate)
      return true;
    else
      return false;
  }

  getUserDataObserve(): Observable<IUserData> {
    return interval().pipe(
      map(() => this.userData || this.getUserData()),
      distinctUntilChanged()
    );
  }

  clear(): void {
    this.token = null;
    //this.localStorage.clear();
    localStorage.removeItem(this.authToken)
    localStorage.removeItem(this.TokenExpiration)
    localStorage.removeItem(this.UserFullName);
    localStorage.removeItem('userData')
  }

  logout(): void {
    this.clear();
  }

  isAuthenticated(): Observable<boolean> {
    return interval().pipe(
      map(() => localStorage.authKey != null && !this.CheckIfTokenExpire(localStorage.TokenExpiration)),
      distinctUntilChanged()
    );
  }

}


