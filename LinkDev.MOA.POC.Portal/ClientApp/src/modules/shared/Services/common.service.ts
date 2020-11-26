import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AppConfigService } from 'src/modules/shared/services/app-config.service';

@Injectable()
export class CommonService {

  langCode : string;
  SubmitRequest = 'Request/Post';
  AccountsOfLoggedInUser = 'Accounts/Post';

  constructor(
    private httpClient : HttpClient,
    ) {
      // this.SubmitRequest = appConfigService.apiBaseUrl + "api/" + this.SubmitRequest;
      // this.AccountsOfLoggedInUser = appConfigService.apiBaseUrl + "api/" + this.AccountsOfLoggedInUser;
     }

  customGet(apiUrl : string) : Observable<any>{
    return this.httpClient.get(apiUrl);
  }

  SubmitRequestFN(requestData: any): Observable<any>{
    return this.httpClient.post(this.SubmitRequest , requestData);
  }

  GetAccountsOfLoggedInUserFN(Obj: any): Observable<any>{
    return this.httpClient.post(this.AccountsOfLoggedInUser , Obj);
  }

}
