import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingScreenService {

  private _loading: boolean = false;
  private _activeReq: number = 0;

  get loading():boolean {
    return this._loading;
  }

  startLoading() {
    this._loading = true;
    this._activeReq++;
  }

  stopLoading() {

    if(this._activeReq > 0){
      this._activeReq--;
    }

    if(this._activeReq == 0){
         this._loading = false;
    }
  }
}
