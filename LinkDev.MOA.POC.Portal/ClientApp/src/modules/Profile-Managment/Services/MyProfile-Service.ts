 import { Injectable } from '@angular/core';
 import { UserInfo } from '../Models/UserInfo';
 //import { AppConfigService } from 'src/modules/shared/services/app-config.service';
 import { Observable } from 'rxjs';
 import { ApiGenericResponse } from '../../shared/Models/api-generic-response';
 import { EServiceModel } from 'src/modules/shared/Models/eservice-model.model';
 import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';

 @Injectable({
   providedIn: 'root'
 })
 export class MyProfileService  {
   private getUrl = 'api/ProfileManagement/GetUserProfileInfo';
   private postUrl = 'api/ProfileManagement/SubmitMyProfile'
  
   constructor(private http: APIService) {
     
   }

   get(): Observable<ApiGenericResponse<UserInfo>> {
     return this.http.Get<ApiGenericResponse<UserInfo>>(`${this.getUrl}`);
   }
   post(UserInfo: UserInfo): Observable<ApiGenericResponse<UserInfo>> {
     return this.http.Post<ApiGenericResponse<UserInfo>>(this.postUrl, UserInfo);
   }
 }
